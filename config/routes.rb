Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :restaurants do
      resources :foods, only: %i[index]
    end
    resources :line_foods, only: %i[index create]
    put "line_foods/replace", to: "line_foods#replace"
    # 'line_foods/replace'というURLに対してPUTリクエストがきたら、line_foods_controller.rbのreplaceメソッドを呼ぶ
    resources :orders, only: %i[create]
  end
end
