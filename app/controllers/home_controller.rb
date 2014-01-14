class HomeController < ApplicationController
  protect_from_forgery except: :media
  def index
    respond_to do |format|
      format.html
    end
  end
  def dashboard
    @uploaded = Picture.order(created_at: :desc).take(4)
    @pictures = getHashtag
    respond_to do |format|
      format.html
      format.json {render json: { :picture => @pictures, :uploaded => @uploaded} }
    end
  end
  def media
    @picture = getPic(params[:id])
    render template: 'home/media', layout: false, picture: @picture
  end
  def about
    render template: 'home/about', layout: false
  end
  def register
    render template: 'home/register', layout: false
  end
  def loginform
    render template: 'home/loginform', layout: false
  end
  def getHashtag
    begin
      require 'net/http'
      uri = URI.parse("https://api.instagram.com/v1/tags/vidasonline/media/recent?client_id=#{ENV['INSTAGRAM_CLIENT_ID']}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      req = Net::HTTP::Get.new(uri.request_uri)
      response = http.request req
      body = ActiveSupport::JSON.decode(response.body)
      body['data']
    rescue Exception => e
      []
    end
  end
  def getPic(id)
    begin
      require 'net/http'
      uri = URI.parse("https://api.instagram.com/v1/media/#{id}?client_id=#{ENV['INSTAGRAM_CLIENT_ID']}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      req = Net::HTTP::Get.new(uri.request_uri)
      response = http.request req
      ActiveSupport::JSON.decode(response.body)
    rescue Exception => e
      []
    end
  end
end