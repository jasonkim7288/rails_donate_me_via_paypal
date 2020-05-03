class ApplicationController < ActionController::Base
    def after_sign_in_path_for(resource)
        if resource.is_a?(User)
            pages_donation_path
        else
            super
        end
    end    
end
