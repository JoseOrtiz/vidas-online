class HomeController < ApplicationController
  protect_from_forgery except: :media
  def index
    respond_to do |format|
      format.html
    end
  end
  def dashboard
    response = getHashtag
    @pictures = response['data']
    respond_to do |format|
      format.html
      format.json {render json: @pictures}
    end
  end
  def media
    @picture = getPic(params[:id])
    render template: 'home/media', layout: false, picture: @picture
  end
  def getHashtag
    require 'net/http'
    uri = URI.parse("https://api.instagram.com/v1/tags/vidasonline/media/recent?client_id=#{ENV['INSTAGRAM_CLIENT_ID']}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Get.new(uri.request_uri)
    response = http.request req
    ActiveSupport::JSON.decode(response.body)
  end
  def getPic(id)
    require 'net/http'
    uri = URI.parse("https://api.instagram.com/v1/media/#{id}?client_id=#{ENV['INSTAGRAM_CLIENT_ID']}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Get.new(uri.request_uri)
    response = http.request req
    ActiveSupport::JSON.decode(response.body)
  end
end