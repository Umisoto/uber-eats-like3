3.times do |n|
    restaurant=Restaurant.new(
        name: "testレストラン_#{n}",
        time_required: 10,
        shipping: 100
    )

    12.times do |m|
        restaurant.foods.build(
            # Food.newすることなくリレーションを持ったfoodを生成
            name: "フード名_#{n}_#{m}",
            description: "フード名_#{n}_#{m}の説明文です。",
            price: 500
        )
    end

    restaurant.save!
    # データをDBに書き込み
end