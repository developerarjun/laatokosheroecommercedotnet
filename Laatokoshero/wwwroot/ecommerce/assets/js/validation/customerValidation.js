$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Mobile number must be valid."
);

var registerRule = {
    firstname: {
        required: true
    },
    lastname: {
        required: true
    },
    email: {
        required: true,
        email: true
    },
    mobileno: {
        required: true,
        regex: /^(\+\d{1,3}[- ]?)?(98|97|96)\d{8}$/
    },
    password: {
        required: true,
        minlength: 8
    },
    password_confirmation: {
        equalTo: "#inputpassword"
    },
    addressDetails: {
        required: true
    },
    latitude: {
        required: true
    }
};

var registerRule2 = {
    fullname: {
        required: true
    },
    email: {
        required: true,
        email: true
    },
    mobileno: {
        required: true,
        regex: /^(\+\d{1,3}[- ]?)?(98|97|96)\d{8}$/
    },
    password: {
        required: true,
        minlength: 8
    },
    password_confirmation: {
        equalTo: "#poppassword"
    },
    addressDetails: {
        required: true
    },
    latitude: {
        required: true
    }
};

var registerMsg = {
    firstname: {
        required: "Enter Firstname."
    },
    lastname: {
        required: "Enter Lastname."
    },
    email: {
        required: "Enter Email.",
        email: "Email must be a valid."
    },
    mobileno: {
        required: "Enter Mobile Number."
    },
    password: {
        required: "Enter Password."
    },
    password_confirmation: {
        equalTo: "The password confirmation does not match."
    },
    addressDetails: {
        required: "Enter Address Details."
    },
    latitude: {
        required: "Please choose location."
    }
};

$("#registerForm").validate({
    ignore: "",
    rules: registerRule,
    messages: registerMsg
});

$("#popupRegisterForm").validate({
    ignore: "",
    rules: registerRule2,
    messages: registerMsg
});

$("#registerCompleteForm").validate({
    ignore: "",
    rules: {
        firstname: {
            required: true
        },
        lastname: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        mobileno: {
            required: true,
            regex: /^(\+\d{1,3}[- ]?)?(98|97|96)\d{8}$/
        },
        addressDetails: {
            required: true
        },
        latitude: {
            required: true
        }
    },
    messages: {
        firstname: {
            required: "Enter Firstname."
        },
        lastname: {
            required: "Enter Lastname."
        },
        email: {
            required: "Enter Email.",
            email: "Email must be a valid."
        },
        mobileno: {
            required: "Enter Mobile Number."
        },
        addressDetails: {
            required: "Enter Address Details."
        },
        latitude: {
            required: "Please choose location."
        }
    }
});

$("#profileForm").validate({
    ignore: "",
    rules: {
        firstname: {
            required: true
        },
        lastname: {
            required: true
        },
        customerAddress: {
            required: true
        },
        latitude: {
            required: true
        }
    },
    messages: {
        firstname: {
            required: "Enter Firstname."
        },
        lastname: {
            required: "Enter Lastname."
        },
        customerAddress: {
            required: "Enter Address Details."
        },
        latitude: {
            required: "Please choose location."
        }
    }
});

$("#changePasswordForm").validate({
    rules: {
        oldPassword: {
            required: true
        },
        password: {
            required: true,
        },
        password_confirmation: {
            equalTo: "#password"
        }
    },
    messages: {
        fullname: {
            required: "Enter Full Name."
        },
        password: {
            required: "Enter New Password."
        },
        password_confirmation: {
            equalTo: "The password confirmation does not match."
        }
    }
});

$("#enquiryForm").validate({
    rules: {
        fullname: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        enquiry: {
            required: true
        }
    },
    messages: {
        fullname: {
            required: "Enter Full Name."
        },
        email: {
            required: "Enter Email.",
            email: "Email must be a valid email address.",
        },
        enquiry: {
            required: "Enter Enquiry."
        }
    }
});

$("#changeMobileNumReqForm").validate({
    rules: {
        newMobileNumber: {
            required: true,
            regex: /^(\+\d{1,3}[- ]?)?(98|97|96)\d{8}$/
        }
    },
    messages: {
        newMobileNumber: {
            required: "Enter New Mobile Number."
        }
    }
});

$("#changeMobileNumberOTPForm").validate({
    rules: {
        otpCode: {
            required: true
        }
    },
    messages: {
        otpCode: {
            required: "Enter OTP Code."
        }
    }
});

$("#forgotPassForm").validate({
    rules: {
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        email: {
            required: "Enter Email.",
            email: "Email must be a valid.",
        },
    }
});

$("#resetPassForm").validate({
    rules: {
        resetToken: {
            required: true
        },
        password: {
            required: true,
            minlength: 8
        },
        password_confirmation: {
            equalTo: "#inputpassword"
        }
    },
    messages: {
        email: {
            required: "Enter OTP Token."
        },
        password: {
            required: "Enter Password."
        },
        password_confirmation: {
            equalTo: "The password confirmation does not match."
        }
    }
});
