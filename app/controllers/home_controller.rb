class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.html
    end
  end
  def dashboard
    respond_to do |format|
      format.html
    end
  end
  def getAccessToken
    require 'net/http'
    require 'uri'
    uri = URI.parse("https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=/oauth&response_type=code")
  end
end