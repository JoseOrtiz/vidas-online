
class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.html
    end
  end
  def dashboard
    response = getPics
    @pictures = response['data']
    respond_to do |format|
      format.html
      format.json {render json: @pictures}
    end
  end

  def getPics
    require 'net/http'
    uri = URI.parse("https://api.instagram.com/v1/tags/vidasonline/media/recent?client_id=#{ENV['INSTAGRAM_CLIENT_ID']}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Get.new(uri.request_uri)
    response = http.request req
    ActiveSupport::JSON.decode(response.body)
  end
end