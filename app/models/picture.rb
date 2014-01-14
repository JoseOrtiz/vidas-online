class Picture < ActiveRecord::Base
  require 'carrierwave/orm/activerecord'
  mount_uploader :caption, CaptionUploader
  belongs_to :user

  private

  def picture_params
    params.require(:picture).permit(:comment, :upload_date, :caption)
  end
end
