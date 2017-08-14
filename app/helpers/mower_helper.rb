# frozen_string_literal: true

# View helper for mowers
module MowerHelper
  def mower_brands
    Mower.brands.keys.map { |k| [mower_brand(k), k] }
  end

  def mower_brands_h
    Mower.brands.keys.map { |k| [k, mower_brand(k)] }.to_h
  end

  def mower_brand(key)
    t("model.mower.brand.#{key}")
  end
end
