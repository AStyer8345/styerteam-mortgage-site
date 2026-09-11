// Publishing refinement: preserve all words and existing anchors while adding
// useful navigation to long articles and breaking up unusually dense paragraphs.
const text = value => value.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
function refineLongform(html) {
  return html.replace(/(<main\b[^>]*>)([\s\S]*?)(<\/main>)/, (_, open, content, close) => {
    content = content.replace(/<p>([\s\S]*?)<\/p>/g, (original, body) => {
      if (text(body).split(/\s+/).length < 120) return original;
      // Only split between complete sentences outside inline HTML elements.
      let depth=0, start=0, pieces=[];
      for (const match of body.matchAll(/<\/?[a-z][^>]*>|[.!?]\s+(?=[A-Z])/gi)) {
        const token=match[0];
        if(token.startsWith('<')) {
          if(/^<\//.test(token)) depth=Math.max(0,depth-1);
          else if(!/^<(?:br|img|hr)\b/i.test(token)) depth++;
        } else if(depth===0) {
          const end=match.index+1;
          const before=text(body.slice(start,end)).split(/\s+/).length;
          const after=text(body.slice(end)).split(/\s+/).length;
          if(before>=55 && after>=35 && !/\b(?:Dr|Mr|Mrs|Ms|St|U\.S)\.$/.test(body.slice(0,end))) {pieces.push(body.slice(start,end));start=end;}
        }
      }
      if(!pieces.length)return original;
      pieces.push(body.slice(start));return pieces.map(piece=>'<p>'+piece.trim()+'</p>').join('\n');
    });
    const longform=/class="[^"]*(?:blog-post|blog-article|article-body)/.test(content) || /<body\b[^>]*class="[^"]*\blocation-page\b/.test(html);
    if(!longform || /class="[^"]*(?:page-contents|\btoc\b|table-of-contents)/.test(content)) return open+content+close;
    const headings=[...content.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g)];
    if(headings.length<4) return open+content+close;
    const selected=headings.filter(h=>!/(?:ready to|ready for|let.s talk|want adam|next step|your next move)/i.test(text(h[2]))).slice(0,8);
    if(selected.length<4)return open+content+close;
    const used=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
    const links=[];
    for(const heading of selected) {
      const existing=heading[1].match(/\bid="([^"]+)"/);
      let id=existing?.[1];
      if(!id){const stem='guide-'+text(heading[2]).toLowerCase().replace(/&[^;]+;/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90);id=stem;let n=2;while(used.has(id))id=stem+'-'+n++;used.add(id);content=content.replace(heading[0],`<h2${heading[1]} id="${id}">${heading[2]}</h2>`);}
      links.push(`<li><a href="#${id}">${text(heading[2])}</a></li>`);
    }
    const nav=`<nav class="page-contents" aria-label="On this page"><p class="page-contents-title">On this page</p><ol>${links.join('')}</ol></nav>\n`;
    const header=content.match(/<header\b[^>]*class="blog-post-header"[^>]*>[\s\S]*?<\/header>/);
    if(header)content=content.replace(header[0],header[0]+'\n'+nav);
    else content=content.replace(/<h2\b/,nav+'<h2');
    return open+content+close;
  });
}

module.exports = { refineLongform };
