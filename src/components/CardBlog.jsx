const CardBlog = ({ blog }) => {
  return (
    <div
      className="bg-zinc-900 border border-zinc-700 
                    p-6 font-mono 
                    hover:bg-zinc-800 transition-colors duration-200"
    >
      {/* Metadata estilo terminal */}
      <div className="text-xs text-cyan-400 mb-2">{blog.user.name}</div>

      {/* Título */}
      <h2 className="text-xl text-amber-400 mb-3 border-b border-zinc-700 pb-2">
        {blog.title}
      </h2>

      {/* Contenido */}
      <p className="text-sm text-zinc-300 leading-relaxed">
        {blog.content.slice(0, 150)}...
      </p>

      {/* Footer técnico */}
      <div className="mt-4 flex justify-between text-xs">
        <span className="text-red-500">LOG_ENTRY</span>
      </div>
    </div>
  );
};

export default CardBlog;
