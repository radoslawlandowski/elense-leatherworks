module Jekyll
  # Small helpers for templates.
  module ElenseFilters
    # 89 -> "89.00", 24.5 -> "24.50". Used by the product feed, which needs two decimals.
    def money2(input)
      format("%.2f", input.to_f)
    end
  end
end

Liquid::Template.register_filter(Jekyll::ElenseFilters)
