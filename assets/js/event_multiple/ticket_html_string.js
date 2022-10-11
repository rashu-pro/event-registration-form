/**
 * Created by rashu on 10/1/2022.
 */
let ticketHtml = `
<div class="form-row form-row-ticket-individual active">
    <div class="form-row-head">
        <div class="form-row-head-inner">
            <h3 class="form-row-title">Registration <span class="text-normal text-capitalize">Ticket #<span class="ticket-row">1</span></span></h3>

            <div class="form-row-head-btn">
                <button type="button" class="btn btn-dark btn-collapse btn-ticket-collapse">
                    <i class="fa fa-plus"></i>
                </button>

                <button type="button" class="btn btn-default btn-collapse btn-delete-ticket-js">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="form-row-body">
        <div class="form-fields-wrapper">

            <!-- //=== CONTACT INFORMATION -->
            <div class="contact-information-wrapper b-t-1 mt-4 pt-3">
            
                <!-- //=== CONTACT INFORMATION -->
                <div class="contact-information-inner contact-information-single">
                    <div class="contact-information-grouped-wrapper" data-grouped="1">
                    <div class="contact-information-grouped-single" data-contact="1">
                    <h3 class="text-center font-bold section-title"><span>Perticipant Information <p style="display:inline-block;margin:0; padding-left:10px;" class="contact-number"></p></span></h3>

                    <div class="row mt-3">
                        <div class="col-12 col-sm-9">
                                                                    <div class="row">
                                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                                            <div class="form-group required-group">
                                                                                <label class="form-control-label">First Name <span class="required-mark">*</span></label>
                                                                                <input type="text" name="TicketHolderFirstName[]" class="form-control first-name validation-text">
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                                            <div class="form-group required-group">
                                                                                <label class="form-control-label">Last Name <span class="required-mark">*</span></label>
                                                                                <input type="text" name="TicketHolderLastName[]" class="form-control last-name validation-text">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 col-sm-3">
                                                                    <div class="form-group required-group">
                                                                        <label>Gender <span class="required-mark">*</span></label>
                                                                        <select class="form-control gender-selector" name="TicketHolderGender[]">
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group email-field">
                                <label class="form-control-label">Email <span class="required-mark">*</span></label>
                                <input type="email" name="TicketHolderEmail[]" class="form-control email validation-email">
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="form-control-label">Phone Number <span class="required-mark">*</span></label>
                                <input type="text" name="TicketHolderPhoneNumber[]" class="form-control phone-number-mask">
                            </div>
                        </div>
                        
                        <!--Grade-->
                                                                <div class="col-12 col-sm-6 col-md-6">
                                                                    <div class="form-group required-group">
                                                                        <label class="form-control-label">Grade
                                                                            <span class="required-mark">*</span></label>
                                                                        <select class="form-control" name="Grade[]">
                                                                            <option>-- Select Grade --</option>
                                                                            <option value="2nd Grade">2nd Grade</option>
                                                                            <option value="3rd Grade">3rd Grade</option>
                                                                            <option value="4th Grade">4rd Grade</option>
                                                                            <option value="5th Grade">5th Grade</option>
                                                                            <option value="6th Grade">6th Grade</option>
                                                                            <option value="7th Grade">7th Grade</option>
                                                                            <option value="8th Grade">8th Grade</option>
                                                                            <option value="9th Grade">9th Grade</option>
                                                                            <option value="10th Grade">10th Grade</option>
                                                                            <option value="11th Grade">11th Grade</option>
                                                                            <option value="12th Grade">12th Grade</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                        
                        <!--t-shirt size-->
                                                                <div class="col-12 col-sm-6 col-md-6">
                                                                    <div class="form-group">
                                                                        <label class="form-control-label">T-Shirt Size
                                                                            <span class="required-mark">*</span></label>
                                                                        <select class="form-control" name="TshirSize[]">
                                                                            <option>-- Select T-shirt Size --</option>
                                                                            <option value="youth small">Youth Small</option>
                                                                            <option value="youth small">Youth Medium</option>
                                                                            <option value="youth large">Youth Large</option>
                                                                            <option value="Adult Small">Adult Small</option>
                                                                            <option value="Adult Medium">Adult Medium</option>
                                                                            <option value="Adult Large">Adult Large</option>
                                                                            <option value="Adult XL">Adult XL</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                
                                                                <!--select group-->
                                                                <div class="col-12">
                                                                    <div class="form-group">
                                                                        <label class="form-control-label font-600">Select Group <span class="text-danger">*</span></label>
                                                                        <div class="checkbox-holder checkbox-medium check-circle">
                                                                            <input type="radio" id="radio-1" class="regular-checkbox ticket-category-checkbox" name="group[]">
                                                                            <label for="radio-1"><span class="checkbox-text">Track 1 - 2nd - 7th Grade</span> </label>
                                                                        </div>

                                                                        <div class="checkbox-holder checkbox-medium check-circle">
                                                                            <input type="radio" id="radio-2" class="regular-checkbox ticket-category-checkbox" name="group[]">
                                                                            <label for="radio-2"> <span class="checkbox-text">Track 2 - 8th - 12th Grade</span> </label>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <!--preorder sweater-->
                                                                <div class="col-12">
                                                                    <hr>
                                                                    <div class="static-div">
                                                                        <h4 class="mt-2">Pre-Order Youth Conference Sweat Shirt</h4>
                                                                        <div class="checkbox-medium">
                                                                            <input type="checkbox" id="${uniqueId}" name="Tshirt[]" class="regular-checkbox t-shirt-checkbox" data-name="T-Shirt" data-unitprice="20">
                                                                            <label for="${uniqueId}"> <span class="checkbox-text">T-Shirt ($20)</span> </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                    </div>
                    </div>
                    </div>
                   
                </div>
                
                <div class="contact-information-inner contact-information-grouped">
                    <div class="contact-information-grouped-wrapper" data-grouped="1">
                    </div>
                </div>
                
               
            </div>
        </div>

        <div class="form-row-foot">
            <div class="text-center">
                <a href="javascript:void(0)" class="btn btn-dark btn-add-another-js">
                    <img src="https://res.cloudinary.com/secure-api/image/upload/v1652709692/secure-api/Common/assets/plus_circle.png" class="img-left">
                    <span class="btn-text">Save and Add Another Ticket</span>
                </a>
            </div>
        </div>
    </div>
</div>
`;