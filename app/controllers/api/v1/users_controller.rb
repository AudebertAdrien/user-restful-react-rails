class Api::V1::UsersController < ApplicationController
  def index
    users = Users.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      puts "#" * 100
      puts recipe
      puts "#" * 100
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
  end

  def destroy
  end

  private

  def recipe_params
    params.permit(:name, :description, :image)
  end
end
