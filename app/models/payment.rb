class Payment < ApplicationRecord
    belongs_to :user
    has_rich_text :comment
end
