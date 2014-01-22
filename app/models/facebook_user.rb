class FacebookUser < ActiveRecord::Base
  belongs_to :user
  def user_params
    params.require(:facebookuser).permit(:provider, :oauth_token, :uid, :user_id, :oauth_expires_at)
  end
end
