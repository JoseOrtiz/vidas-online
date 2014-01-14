class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(:username => params[:user][:username], :email => params[:user][:email], :password => params[:user][:password])
    if @user.save
      head :created
    else
      head :bad_request
    end
  end
end
