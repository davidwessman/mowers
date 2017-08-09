FactoryGirl.define do
  factory :mower do
    customer
    brand { Mower.brands.keys.sample }
    model { ["AM 330", "AM 320", "AM 105"].sample }
    year { Time.current.year - rand(3) }
    comment ""
  end
end
