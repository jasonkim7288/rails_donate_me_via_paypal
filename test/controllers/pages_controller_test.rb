require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_index_url
    assert_response :success
  end

  test "should get donation" do
    get pages_donation_url
    assert_response :success
  end

  test "should get management" do
    get pages_management_url
    assert_response :success
  end
  

end
