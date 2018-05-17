module.exports = function(chunksTotal, { node }) {
  const {
    fields: { slug },
    frontmatter: { title },
    internal: { content }
  } = node;

  const contentChunks = chunkString(content, 5000);
  const record = { title, slug, content };
  const recordChunks = contentChunks.reduce((recordChunksTotal, contentChunksItem, idx) => {
    return [...recordChunksTotal, { ...record, ...{ content: contentChunksItem } }];
  }, []);

  return [...chunksTotal, ...recordChunks];
};

function chunkString(str, length) {
  return str.match(new RegExp("(.|[\r\n]){1," + length + "}", "g"));
}
