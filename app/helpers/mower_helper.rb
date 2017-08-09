# frozen_string_literal: true

# View helper for mowers
module MowerHelper
  def mower_brands
    Mower.brands.keys.map { |k| [mower_brand(k), k] }
  end

  def mower_brand(key)
    t("models.mower.brand.#{key}")
  end
end
