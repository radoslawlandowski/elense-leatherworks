module Jekyll
  class PostAssetFile < StaticFile
    def initialize(site, source, dir, name, destination_relative_dir)
      super(site, source, dir, name)
      @destination_relative_dir = destination_relative_dir
    end

    def destination(dest)
      File.join(dest, @destination_relative_dir, @name)
    end
  end

  class PostAssetsGenerator < Generator
    safe true
    priority :low

    SKIPPED_EXTENSIONS = [".md", ".markdown", ".mkd", ".mkdn", ".mdown", ".html"].freeze

    def generate(site)
      return unless site.respond_to?(:posts) && site.posts.respond_to?(:docs)

      seen = {}

      site.posts.docs.each do |post|
        post_path = File.expand_path(post.path)
        post_dir = File.dirname(post_path)
        source_post_dir = relative_path(site.source, post_dir)
        post_filename = File.basename(post_path)
        destination_root = source_post_dir.sub(%r{\A_posts/}, "posts/")

        Dir.glob(File.join(post_dir, "**", "*")).each do |asset_path|
          next unless File.file?(asset_path)
          next if File.basename(asset_path) == post_filename
          next if SKIPPED_EXTENSIONS.include?(File.extname(asset_path).downcase)

          source_dir = relative_path(site.source, File.dirname(asset_path))
          relative_asset_dir = relative_path(post_dir, File.dirname(asset_path))
          destination_dir = destination_root
          destination_dir = File.join(destination_root, relative_asset_dir) unless relative_asset_dir == "."
          destination_key = File.join(destination_dir, File.basename(asset_path))
          next if seen[destination_key]

          seen[destination_key] = true
          site.static_files << PostAssetFile.new(
            site,
            site.source,
            source_dir,
            File.basename(asset_path),
            destination_dir
          )
        end
      end
    end

    private

    def relative_path(base, target)
      target.sub(%r{\A#{Regexp.escape(File.expand_path(base))}/?}, "")
    end
  end
end
