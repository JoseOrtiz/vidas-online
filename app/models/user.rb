class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  attr_accessor :password
  before_save :encrypt_password
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :username
  validates_presence_of :email
  validates_uniqueness_of :email
  has_many :facebook_users, :dependent => :delete_all

  has_many :pictures

  def self.authenticate(username, password)
    user = find_by_username(username)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
  def from_omniauth(auth)
    self.email = auth['info']['email']
    self.username = auth['info']['nickname']
    if self.username.blank?
      self.username = auth['info']['name']
    end
    return facebook_users.build(:provider => auth['provider'], :uid => auth['uid'], :oauth_token => auth['credentials']['token'], :oauth_expires_at => Time.at(auth['credentials']['expires_at']))
  end  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end