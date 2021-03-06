class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    before_action :configure_permitted_parameters, if: :devise_controller?
    
    def after_sign_in_path_for(resource)
        if resource.is_a?(User)
            root_path
        else
            super
        end
    end

    protected
        def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:user_name])
            devise_parameter_sanitizer.permit(:account_update, keys: [:user_name])
        end
end
