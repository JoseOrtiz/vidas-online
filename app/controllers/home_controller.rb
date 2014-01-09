class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.html
    end
  end
  def dashboard
    require 'net/http'
    require 'uri'
    uri = URI.parse("https://api.instagram.com/v1/tags/vidas-online/media/recent?access_token=ACCESS-TOKEN")
    respond_to do |format|
      format.html
    end
  end
end