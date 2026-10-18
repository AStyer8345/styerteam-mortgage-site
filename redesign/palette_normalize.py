"""Neutralize inherited green CSS literals in generated files only.
Preserve layout, selectors, alpha, content, scripts, images and original snapshots.
The approved final override owns the intended semantic component palette.
"""
import colorsys, re
CHANGES=[]
COLOR=re.compile(r'#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{4}\b|#[0-9a-fA-F]{3}\b|rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+(?:\s*,\s*[\d.]+)?\s*\)')

def neutralize(text, source):
    def declaration(match):
        prop,value,end=match.groups(); urls=[]
        def protect(m):urls.append(m.group());return '__URL_%d__'%(len(urls)-1)
        value=re.sub(r'url\([^)]*\)',protect,value)
        def color(m):
            raw=m.group();alpha=None
            if raw.startswith('#'):
                h=raw[1:]
                if len(h) in [3,4]:h=''.join(c*2 for c in h)
                r,g,b=[int(h[i:i+2],16) for i in [0,2,4]]
                if len(h)==8:alpha=int(h[6:],16)/255
            else:
                n=[float(v) for v in re.findall(r'[\d.]+',raw)];r,g,b=n[:3]
                if len(n)>3:alpha=n[3]
            hue,light,sat=colorsys.rgb_to_hls(r/255,g/255,b/255)
            if not (70<=hue*360<=190 and sat>.045):return raw
            if 'border' in prop or 'outline' in prop:target='#e2e8f0' if light>.55 else '#64748b'
            elif prop.strip()=='color' or 'text' in prop:target='#ffffff' if light>.72 else '#0f172a'
            else:target='#f8fafc' if light>.70 else '#475569' if light>.40 else '#0f172a'
            if alpha is not None:
                rr,gg,bb=[int(target[i:i+2],16) for i in [1,3,5]]
                target='rgba(%d,%d,%d,%s)'%(rr,gg,bb,format(alpha,'.4g'))
            CHANGES.append({'source':source,'property':prop.strip(),'before':raw,'after':target})
            return target
        value=COLOR.sub(color,value)
        for i,url in enumerate(urls):value=value.replace('__URL_%d__'%i,url)
        return prop+':'+value+end
    return re.sub(r'([\w-]+\s*):([^;{}]+)([;}]?)',declaration,text)
