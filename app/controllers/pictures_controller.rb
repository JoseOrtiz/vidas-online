class PicturesController < ApplicationController
  before_filter :login_required

  def login_required
    redirect_to :controller => :home, :action => :register unless current_user
  end
  def new
    @picture = Picture.new
  end
  def create
    @picture = Picture.new( pictures_params )
    @picture.user = current_user
    if @picture.save
      redirect_to dashboard_url
    else
      redirect_to dashboard_url, status: 400
    end
  end

  def show
    @picture = Picture.find(params[:id])
    render layout: false, picture: @picture
  end


  private

  def pictures_params
    params.require(:picture).permit(:comment, :upload_date, :caption)
  end
end
