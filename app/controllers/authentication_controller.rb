#encoding: UTF-8
class AuthenticationController < ApplicationController

  def create
    auth = request.env["omniauth.auth"]

    authentication = FacebookUser.find_by_provider_and_uid(auth['provider'], auth['uid'])
    if !user_signed_in?
      if authentication
        flash[:notice] = ""
        cookies['fat'] = auth['credentials']['token']
        authentication.update_attribute(:oauth_token, auth['credentials']['token'])
        sign_in_and_redirect(:user, authentication.user)
      else
        existingUser = User.find_by_email(auth['info']['email'])
        if existingUser.nil?
          user = User.new
          face = user.from_omniauth(auth)
          if user.save(:validate => false)
            sign_in_and_redirect(:user, user)
          else
            flash[:error] = "Error while creating a user account. Please try again."
            redirect_to :dashboard
          end
        else
          face = FacebookUser.create!(provider:auth['provider'],
                                      uid:auth['uid'],
                                      oauth_token:auth['credentials']['token'],
                                      oauth_expires_at:Time.at(auth['credentials']['expires_at']),
                                      user_id:existingUser.id)
          
          if face.save(:validate => false)
            sign_in_and_redirect(:user, existingUser)
          else
            flash[:error] = "Error while signed a user account. Please try again."
            redirect_to :dashboard
          end
        end
      end
    else
      if authentication
        current_user.facebook_users.create(:provider => auth['provider'], :uid => auth['uid'], :oauth_token => auth['credentials']['token'], oauth_expires_at:Time.at(auth['credentials']['expires_at']))
        redirect_to :dashboard
      else
        redirect_to :dashboard
      end  
    end
  end

  def failure
    render :text => "Sorry, but you didn't allow access to our app!"
  end
end
    