import sys,os,json,subprocess,signal,time,socket,hashlib,re,traceback,gc
from pathlib import Path
from urllib.request import Request,build_opener,HTTPRedirectHandler
from urllib.error import HTTPError,URLError
from urllib.parse import urlsplit,urljoin,unquote,quote
from html.parser import HTMLParser
import xml.etree.ElementTree as ET
from PIL import Image
from io import BytesIO
ROOT=Path(__file__).resolve().parent.parent
EV=ROOT/'preview/.cache'
EV.mkdir(parents=True,exist_ok=True)
TOOLS=ROOT/'preview/tools'
MODE=sys.argv[1];PORT=33433 if MODE=='node' else 33434;ORIGIN=f'http://localhost:{PORT}';SITE='https://www.saintnaummonastery.com'
MAN=json.loads((EV/'build-receipt.json').read_text())
BUILD=(ROOT/'.next/BUILD_ID').read_text().strip()
class NoRedirect(HTTPRedirectHandler):
 def redirect_request(self,*a,**k):return None
OPENER=build_opener(NoRedirect)
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.tags=[];self.meta={};self.links=[];self.ids=set();self.resources=set();self.h1=[];self.titles=[];self.schema=[];self.h=None;self.t=None;self.j=None;self.lang=None;self.html=0;self.head=0;self.body=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html':self.html+=1;self.lang=a.get('lang')
  if tag=='head':self.head+=1
  if tag=='body':self.body+=1
  if a.get('id'):self.ids.add(a['id'])
  if tag=='meta':self.meta.setdefault(a.get('name',a.get('property','')),[]).append(a.get('content',''))
  if tag=='link':
   self.links.append(a)
   if any(x in a.get('rel','').split() for x in ['stylesheet','preload','modulepreload']) and a.get('href'):self.resources.add(a['href'])
  if tag=='a' and a.get('href'):self.tags.append(a['href'])
  if tag in ['img','script','source'] and a.get('src'):self.resources.add(a['src'])
  if tag=='h1':self.h=[]
  if tag=='title':self.t=[]
  if tag=='script' and a.get('type')=='application/ld+json':self.j=[]
 def handle_data(self,d):
  if self.h is not None:self.h.append(d)
  if self.t is not None:self.t.append(d)
  if self.j is not None:self.j.append(d)
 def handle_endtag(self,t):
  if t=='h1' and self.h is not None:self.h1.append(''.join(self.h).strip());self.h=None
  if t=='title' and self.t is not None:self.titles.append(''.join(self.t).strip());self.t=None
  if t=='script' and self.j is not None:
   self.schema.append(json.loads(''.join(self.j)));self.j=None
 def canonical(self):return [x.get('href') for x in self.links if x.get('rel')=='canonical']
 def alts(self):return {x.get('hreflang'):x.get('href') for x in self.links if x.get('rel')=='alternate' and x.get('hreflang')}
def req(path,headers=None):
 q=Request(ORIGIN+path,headers=headers or {})
 try:
  with OPENER.open(q,timeout=30) as r:return r.status,dict(r.headers),r.read()
 except HTTPError as r:return r.code,dict(r.headers),r.read()
def bound():
 for family,typ,proto,cn,addr in socket.getaddrinfo('localhost',PORT,type=socket.SOCK_STREAM):
  with socket.socket(family,typ,proto) as s:
   s.settimeout(.3)
   if s.connect_ex(addr)==0:return True
 return False
def hget(h,k):return next((v for a,v in h.items() if a.lower()==k.lower()),None)
result={'mode':MODE,'origin':ORIGIN,'HEAD':MAN['candidate_commit'],'tree':MAN['candidate_tree'],'BuildID':BUILD,'failures':[],'routes':[],'errors':[],'redirects':[],'resources':[],'images':[],'cache_observations':[]}
def check(cond,msg):
 if not cond:result['failures'].append(msg)
def verify_source():
 for x in MAN['tracked_files']:assert hashlib.sha256((ROOT/x['path']).read_bytes()).hexdigest()==x['sha256'],x['path']
 assert subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD']).decode().strip()==MAN['candidate_commit']
 verify={'tracked_hashes':len(MAN['tracked_files']),'HEAD':MAN['candidate_commit'],'tree':subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD^{tree}']).decode().strip()}
 assert verify['tree']==MAN['candidate_tree'];return verify
proc=None;started=False
def interrupted(signum, frame):
 result['exception']='Interrupted by signal '+str(signum)
 raise KeyboardInterrupt(result['exception'])
signal.signal(signal.SIGTERM,interrupted)
signal.signal(signal.SIGINT,interrupted)
try:
 result['source_pre']=verify_source();assert not bound(),'Own desired port already occupied; no process killed'
 env=os.environ.copy();env['NODE_OPTIONS']='--max-old-space-size=1024';env['WRANGLER_LOG_PATH']=str(EV/(MODE+'-wrangler-logs'));env['npm_config_audit']='true'
 if MODE=='node':argv=['node',str(ROOT/'node_modules/next/dist/bin/next'),'start','--hostname','localhost','--port',str(PORT)]
 else:argv=['node',str(TOOLS/'node_modules/wrangler/bin/wrangler.js'),'dev','--local','--config',str(ROOT/'preview/wrangler.local.jsonc'),'--ip','localhost','--port',str(PORT),'--inspector-port','0','--show-interactive-dev-session=false','--persist-to',str(EV/'worker-local-state')]
 result['argv']=argv
 with (EV/(MODE+'-server.log')).open('w') as log:
  proc=subprocess.Popen(argv,cwd=ROOT,env=env,stdout=log,stderr=subprocess.STDOUT,start_new_session=True);started=True;result['service_pid']=proc.pid
  ready=False
  for i in range(480):
   if proc.poll() is not None:raise RuntimeError('Service exited before readiness: '+str(proc.returncode))
   if bound():
    try:
     if req('/')[0]==200:ready=True;break
    except (URLError,TimeoutError,OSError):pass
   time.sleep(.5)
  assert ready,'No normal readiness within bounded240s'
  result['ready']=True;pages={};resources=set()
  paths=['','/nearby/saint-naum-springs','/nearby/bay-of-bones','/nearby/galicica-national-park','/privacy-policy','/terms-of-service','/cookie-settings']
  aliases={'/st-naum-monastery-ohrid':'','/petrovaradin-fortress-clock':'','/petrovaradin-fortress-clock/privacy-policy':'/privacy-policy','/petrovaradin-fortress-clock/terms-of-service':'/terms-of-service'}
  def lp(lang,p):return ('/en' if lang=='en' else '')+p or '/'
  expected_sitemap={SITE+lp(lang,p) for lang in ['zh','en'] for p in paths}
  normal=[(lang,p,p) for lang in ['zh','en'] for p in paths]+[(lang,p,c) for lang in ['zh','en'] for p,c in aliases.items()]
  content=json.loads((ROOT/'src/content/nearby.json').read_text());guide={x['slug']:x for x in content['places']}
  for lang,p,c in normal:
   path=lp(lang,p);status,headers,body=req(path);page=Page();page.feed(body.decode());pages[path]=(page,body)
   canonical=SITE+lp(lang,c);check(status==200,path+' status '+str(status));check(page.html==page.head==page.body==1,path+' document counts');check(page.lang==('en' if lang=='en' else 'zh-CN'),path+' lang');check(len(page.h1)==1 and bool(page.h1[0]),path+' H1');check(len(page.titles)==1 and bool(page.titles[0]),path+' title');check(page.canonical()==[canonical],path+' canonical');check(page.alts()=={'zh-CN':SITE+lp('zh',c),'en':SITE+lp('en',c),'x-default':SITE+lp('zh',c)},path+' hreflang');check(page.meta.get('og:url')==[canonical],path+' og:url');check('noindex' not in ','.join(page.meta.get('robots',[])).lower(),path+' normal noindex');check(BUILD in body.decode(),path+' current BuildID')
   if '/nearby/' in p:
    slug=p.rsplit('/',1)[-1];check(page.h1==[guide[slug][lang]['title']],path+' guide H1');graphs=[j.get('@graph',[]) for j in page.schema if isinstance(j,dict)];flat=[v for g in graphs for v in g];check(any(v.get('@type')=='WebPage' and v.get('url')==canonical for v in flat),path+' WebPage schema');check(any(v.get('@type')=='BreadcrumbList' for v in flat),path+' breadcrumb schema');check(not any('aggregateRating' in v or 'review' in v for v in flat),path+' fake rating schema')
   elif c=='':check('nearby' in page.ids,path+' nearby anchor')
   resources.update(page.resources);(EV/(MODE+'-page-'+path.strip('/').replace('/','_')+'.html')).write_bytes(body)
   result['routes'].append({'path':path,'status':status,'canonical':page.canonical(),'title':page.titles,'h1':page.h1,'lang':page.lang,'schemas':len(page.schema),'http_x_robots_tag':hget(headers,'x-robots-tag')})
  for path in ['/not-a-real-row33-page','/en/not-a-real-row33-page','/nearby/not-a-real-row33-place','/en/nearby/not-a-real-row33-place']:
   status,headers,body=req(path);page=Page();page.feed(body.decode());robots=','.join(page.meta.get('robots',[]))+','+str(hget(headers,'x-robots-tag') or '');check(status==404,path+' real404');check('noindex' in robots.lower(),path+' noindex');result['errors'].append({'path':path,'status':status,'robots':robots});(EV/(MODE+'-error-'+path.strip('/').replace('/','_')+'.html')).write_bytes(body)
  for path,end in [('/zh','/'),('/zh/nearby/bay-of-bones','/nearby/bay-of-bones')]:
   curr=path;chain=[]
   for _ in range(5):
    status,headers,body=req(curr);chain.append({'path':curr,'status':status,'location':hget(headers,'location')})
    if status not in [301,302,303,307,308]:break
    u=urlsplit(urljoin(ORIGIN+curr,hget(headers,'location')));assert u.netloc==urlsplit(ORIGIN).netloc;curr=u.path+('?' +u.query if u.query else '')
   check(len(chain)>1 and curr==end and status==200,path+' locale normalization');result['redirects'].append(chain)
  status,headers,body=req('/robots.txt');check(status==200 and (SITE+'/sitemap.xml').encode() in body,'robots');(EV/(MODE+'-robots.txt')).write_bytes(body)
  status,headers,body=req('/sitemap.xml');xml=ET.fromstring(body);locations=[n.text for n in xml.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')];check(status==200 and set(locations)==expected_sitemap and len(locations)==14,'sitemap14 canonical only');(EV/(MODE+'-sitemap.xml')).write_bytes(body)
  for path,(page,body) in pages.items():
   for href in page.tags:
    u=urlsplit(urljoin(ORIGIN+path,href))
    if u.netloc not in [urlsplit(ORIGIN).netloc,urlsplit(SITE).netloc] or u.scheme not in ['http','https']:continue
    target=u.path or '/'
    validated_redirects={chain[0]['path']:chain[-1]['path'] for chain in result['redirects'] if len(chain)>1 and chain[-1]['status']==200}
    target=validated_redirects.get(target,target)
    check(target in pages or target in ['/robots.txt','/sitemap.xml'],path+' internal href '+href)
    if u.fragment and target in pages:check(unquote(u.fragment) in pages[target][0].ids,path+' broken fragment '+href)
  for x in MAN['original_images']:resources.add('/'+x['path'].removeprefix('public/'))
  queue=list(resources);seen=set();external=[]
  while queue:
   item=queue.pop();u=urlsplit(urljoin(ORIGIN+'/',item))
   if u.netloc not in [urlsplit(ORIGIN).netloc,urlsplit(SITE).netloc]:external.append(item);continue
   path=u.path+('?' +u.query if u.query else '')
   if path in seen:continue
   seen.add(path);status,headers,body=req(path);check(status==200,path+' resource status '+str(status));row={'path':path,'status':status,'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'content_type':hget(headers,'content-type')};result['resources'].append(row)
   if path.endswith('.css'):
    for v in re.findall(r'url\([\"\']?([^\)\"\']+)',body.decode()):
     if not v.startswith('data:'):queue.append(urljoin(path,v))
   orig=next((x for x in MAN['original_images'] if '/'+x['path'].removeprefix('public/')==u.path),None)
   if orig:
    check(row['sha256']==orig['sha256'] and len(body)==orig['bytes'],path+' original bytes')
    with Image.open(BytesIO(body)) as im:check(list(im.size)==orig['pixels'] and im.format==orig['format'],path+' pixel/format');im.verify()
    with Image.open(BytesIO(body)) as im:im.load();size=list(im.size);fmt=im.format
    del im;gc.collect();result['images'].append({'path':path,'sha256':row['sha256'],'bytes':len(body),'pixels':size,'format':fmt,'full_decode':True})
  result['external_resources_not_fetched']=sorted(set(external));check(len(result['images'])==20,'all20 original images fetched and decoded')
  for path in ['/gallery/row33-missing-image.jpg','/_next/static/row33-missing-asset.js']:
   status,headers,body=req(path);check(status==404,path+' missing resource404');result['resources'].append({'path':path,'expected_missing':True,'status':status})
  for path in ['/','/en/nearby/bay-of-bones']:
   seq=[]
   for _ in range(2):
    status,headers,body=req(path);check(status==200 and BUILD in body.decode(),path+' repeat normal/cache');seq.append({'status':status,'body_sha256':hashlib.sha256(body).hexdigest(),'headers':{k:hget(headers,k) for k in ['cache-control','x-nextjs-cache','age','vary','cf-cache-status']}})
   result['cache_observations'].append({'path':path,'samples':seq,'scope':'local Node/Worker only; not production cache proof'})
  probe='/_next/image?url=%2Fgallery%2Fsaint-naum-monastery-01.jpg&w=640&q=75'
  status,headers,body=req(probe,{'Accept':'image/webp'});ob={'path':probe,'status':status,'content_type':hget(headers,'content-type'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'scope':'one normal local JPEG request; no AVIF/SVG or adversarial input; no production claim'}
  check(status==200 and (hget(headers,'content-type') or '').startswith('image/webp'),'normal image optimization must produce WEBP, not raw-image fallback')
  if hget(headers,'content-type') and hget(headers,'content-type').startswith('image/'):
   with Image.open(BytesIO(body)) as im:im.load();ob.update({'pixels':list(im.size),'format':im.format,'decode':True});check(list(im.size)==[640,456] and im.format=='WEBP','normal image transformation dimensions/format')
  else:ob['body_excerpt']=body.decode(errors='replace')[:1000]
  result['image_optimizer_probe']=ob;result['source_post']=verify_source();result['core_http_result']='PASS' if not result['failures'] else 'FAIL';result['browser_UI']='NOT TESTED'
except Exception as ex:
 result['exception']=repr(ex);result['traceback']=traceback.format_exc();result['core_http_result']='FAIL'
finally:
 if proc is not None:
  if proc.poll() is None:
   os.killpg(proc.pid,signal.SIGTERM)
   try:proc.wait(timeout=20)
   except subprocess.TimeoutExpired:os.killpg(proc.pid,signal.SIGKILL);proc.wait(timeout=10)
  result['service_exit']=proc.returncode;result['owned_service_stopped']=proc.poll() is not None
  for _ in range(20):
   if not bound():break
   time.sleep(.25)
  result['own_port_closed']=not bound()
 result['no_other_process_killed']=True;(EV/(MODE+'-qa-results.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:result.get(k) for k in ['mode','origin','BuildID','core_http_result','failures','exception','image_optimizer_probe','service_pid','service_exit','owned_service_stopped','own_port_closed']},ensure_ascii=False));sys.exit(0 if result.get('core_http_result')=='PASS' and result.get('owned_service_stopped') and result.get('own_port_closed') else 1)
