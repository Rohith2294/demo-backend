var nodemailer = require('nodemailer');

const User = require("../Controllers/Contacts")

      function sendMail(toEmail,userOtp,firstName){
        console.log(toEmail,userOtp)
        console.log('props')
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            }
          });
          var mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to: toEmail,
            subject: 'Sign Up OTP mail',
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <p style="font-size:1.1em">Dear ${firstName} </p>
              <p>Thank you for registering with Rexx Platform. Your One-Time Password (OTP) for completing the Sign Up process is ${userOtp}. Please be aware that this OTP will expire in 5 minutes.</p>
              <p>This is an automated message. Kindly do not respond to this email.</p>
              <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
            </div>
          </div>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            console.log("mail sent")
            if (error) {
              console.log(error);
            } else {
              return info.response;
            }
          });
          }
          function sendforgotpasswordMail(toEmail,userOtp){
            console.log(toEmail,userOtp)
            console.log('props')
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                }
              });
              var mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to: toEmail,
                subject: 'Forgot Password OTP mail',
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                 
                  <p>Thank you for registering with Rexx Platform. Your One-Time Password (OTP) for completing the Forgot Password process is ${userOtp}. Please be aware that this OTP will expire in 5 minutes.</p>
                  <p>This is an automated message. Kindly do not respond to this email.</p>
                  <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                </div>
              </div>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                console.log("mail sent")
                if (error) {
                  console.log(error);
                } else {
                  return info.response;
                }
              });
              }
      async function sendWelcomeMail(toEmail,firstName){
            const findUser = await User.findOne({Email:toEmail})
            if(findUser.UserType === "candidate"){
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                }
              });
              var mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to: toEmail,
                subject: 'Welcome to Rexx',
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Hi ${firstName}, </p>
                  <p>Welcome to Rexx! We're thrilled to have you join our community of aspiring hospitality professionals.
                    Start exploring internship opportunities and connect with experienced mentors.</p>
                  <p>If you have any questions, feel free to reach out to our support team.</p>
                  <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                </div>
              </div>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                console.log("mail sent")
                if (error) {
                  console.log(error);
                } else {
                  return info.response;
                }
              });


            }
            else if(findUser.UserType === "mentor"){
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                }
              });
              var mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to: toEmail,
                subject: 'Welcome to Rexx',
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Hi ${firstName}, </p>
                  <p>Welcome to Rexx! We're excited to have you as a mentor. Share your expertise and help shape the
                  future of hospitality professionals.</p>
                  <p>If you have any questions, feel free to reach out to our support team.</p>
                  <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                </div>
              </div>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                console.log("mail sent")
                if (error) {
                  console.log(error);
                } else {
                  return info.response;
                }
              });

            }
            else if(findUser.UserType === "incharge"){
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                }
              });
              var mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to: toEmail,
                subject: 'Welcome to Rexx',
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Hi ${firstName}, </p>
                  <p>Welcome to Rexx! We're delighted to have you join our network. Connect your students with top
                    internship opportunities and industry mentors.</p>
                  <p>If you have any questions, feel free to reach out to our support team.</p>
                  <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                </div>
              </div>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                console.log("mail sent")
                if (error) {
                  console.log(error);
                } else {
                  return info.response;
                }
              });

            }
            else if(findUser.UserType === "recruiter"){
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                }
              });
              var mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to: toEmail,
                subject: 'Welcome to Rexx',
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Hi ${firstName}, </p>
                  <p>we're excited to have you join our platform. Start discovering talented hospitality students for your internship and job openings!</p>
                  <p>If you have any questions, feel free to reach out to our support team.</p>
                  <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                </div>
              </div>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                console.log("mail sent")
                if (error) {
                  console.log(error);
                } else {
                  return info.response;
                }
              });

            }
            
            
              
          }
      function sendResetPassword(toEmail,userOtp,firstName){
                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'rexxmailservice@gmail.com',
                      pass:"gtmo ohsd ldxr hwmv"
                    }
                  });
                  var mailOptions = {
                    from: 'rexxmailservice@gmail.com',
                    to: toEmail,
                    subject: 'Password Reset Request',
                    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                      <p style="font-size:1.1em">Hi ${firstName} </p>
                      <p>We have received a request to reset your password. Your One-Time Password  for resetting the password is ${userOtp}. Please be aware that this OTP will expire in 5 minutes.</p>
                      <p>This is an automated message. Kindly do not respond to this email.</p>
                      <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                    </div>
                  </div>`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    console.log("mail sent")
                    if (error) {
                      console.log(error);
                    } else {
                      return info.response;
                    }
                  });
      }

      function sendInvitationMail(email,name, inchargeId){
            console.log('props')
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                }
              });
              var mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to: email,
                subject: 'Invitation Email',
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Hi,</p>
                  <p>You are Invited by Incharge ${name} with Id ${inchargeId} to register for RexX platform with the Email ${email} </p>
                  <p style="font-size:0.9em;">Best Regards,<br />The Rexx Team</p> 
                </div>
              </div>`
              };
            
              transporter.sendMail(mailOptions, function(error, info){
                console.log("mail sent")
                if (error) {
                  console.log(error);
                } else {
                  return info.response;
                }
              });
              }
            
      function internshipRemainder(name,toEmail){
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'rexxmailservice@gmail.com',
                    pass:"gtmo ohsd ldxr hwmv"
                  }
                });
                var mailOptions = {
                  from: 'rexxmailservice@gmail.com',
                  to: toEmail,
                  subject: 'Internship Application Reminder',
                  html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                  <div style="margin:50px auto;width:70%;padding:20px 0">
                    <p style="font-size:1.1em">Hi ${name} </p>
                    <p>Just a friendly reminder that the deadline for [Internship Program] applications is approaching. Complete your
                     application today to secure your spot.</p>
                    <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
                  </div>
                </div>`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  console.log("mail sent")
                  if (error) {
                    console.log(error);
                  } else {
                    return info.response;
                  }
                });
    }
      
    function goodByeEmail(name,toEmail){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rexxmailservice@gmail.com',
          pass:"gtmo ohsd ldxr hwmv"
        }
      });
      var mailOptions = {
        from: 'rexxmailservice@gmail.com',
        to: toEmail,
        subject: 'We are Sorry to See Tou Go',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <p style="font-size:1.1em">Hi ${name} </p>
          <p>We are sorry to see you go.If there's anything we could have done better,please let us know.</p>
          <p>If you ever change your mind,you're always welcome back.</p>
          <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
        </div>
      </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        console.log("mail sent")
        if (error) {
          console.log(error);
        } else {
          return info.response;
        }
      });
    }

    function BookingPaymentMails(username,paidFee,dates,email){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rexxmailservice@gmail.com',
        pass:"gtmo ohsd ldxr hwmv"
      }
    });
    var mailOptions = {
      from: 'rexxmailservice@gmail.com',
      to: email,
      subject: 'Payment Successful-[Mentorship Program/Job Seeking Services]',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <p style="font-size:1.1em">Hi ${username} </p>
        <p>Thank you for your payment! We are excited to inform you that your payment for the [Mentorship Program/Job Seeking Services] has been successfully processed.</p>
         <p>**Payment Details:**</p>
        <ul>
                  <li>Amount: ${paidFee}</li>
                  <li>Date: ${dates}</li>
                  <li>Program/Service: [Mentorship Program/Job Seeking Services]</li>
        </ul>
        <p>We look forward to providing you with exceptional service.If you have any
        questions or need assistance,please reach out to our support team.</p>
         <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
      </div>
    </div>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      console.log("mail sent")
      if (error) {
        console.log(error);
      } else {
        return info.response;
      }
    });
    }

    function BookingPaymentMailsForMentor(mentorEmail,paidFee,dates,userName,mentorName){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rexxmailservice@gmail.com',
          pass:"gtmo ohsd ldxr hwmv"
        }
      });
      var mailOptions = {
        from: 'rexxmailservice@gmail.com',
        to: mentorEmail,
        subject: 'Payment Successful-[Mentorship Program/Job Seeking Services]',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <p style="font-size:1.1em">Hi,${mentorName} </p>
          <p>We are pleased to inform you that the payment for the [Mentorship Program/Job Seeking Services] you are facilitating has been successfully received from ${userName}</p>
           <p>**Payment Details:**</p>
          <ul>
                    <li>Amount: ${paidFee}</li>
                    <li>Date: ${dates}</li>
                    <li>Program/Service: [Mentorship Program/Job Seeking Services]</li>
          </ul>
          <p>If you have any questions or need assistance,please reach out to our support team.</p>
           <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
        </div>
      </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        console.log("mail sent")
        if (error) {
          console.log(error);
        } else {
          return info.response;
        }
      });
      }

      function sendRoundStatusEmail(toEmail, companyName, jobDesignation, roundStatus,name) {

        if(roundStatus === "Hired"){
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
        
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to: toEmail,
            subject: `Update on Your Job/Internship Application at ${companyName}`,
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <p style="font-size: 1.1em">Hi,${name}</p>
                <p>Congrulations! We are excited to inform you that you have been offered the ${jobDesignation} position at ${companyName}.
                Please check the attached offer letter for further details and next steps.</p>
                <p>We wish you all the best in your new role.</p>
                <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p>
                
              </div>
            </div>`,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });

        }
        else if(roundStatus === "Rejected"){
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
        
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to: toEmail,
            subject: `Update on Your Job/Internship Application at ${companyName}`,
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <p style="font-size: 1.1em">Hi,${name}</p>
                <p>Thank you for your participation in the overall process with ${companyName}.After careful consideration,
                we regret to inform you that you have not been selected for the position.</p>
                <p>We appreciate your effort and wish you the best in your job/Internship search.</p>
                <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p> 
              </div>
            </div>`,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });

        }
        else{
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'rexxmailservice@gmail.com',
                pass:"gtmo ohsd ldxr hwmv"
              },
            });
          
            const mailOptions = {
              from: 'rexxmailservice@gmail.com',
              to: toEmail,
              subject: `Update on Your Job/Internship Application at ${companyName}`,
              html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                  <p style="font-size: 1.1em">Hi,${name}</p>
                  <p>There has been an update regarding the job/Internship you applied for at ${companyName}. The status of your application has changed to ${roundStatus} </p>
                  <p style="font-size: 0.9em;">Best,<br />The Rexx Team</p> 
                </div>
              </div>`,
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error);
              } else {
                console.log('Mail sent:', info.response);
              }
            });
  
          }  
      }

      function paymentSuccessEmail(email,mailName,amountPaid,paidDate,appliedJob){
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'rexxmailservice@gmail.com',
            pass:"gtmo ohsd ldxr hwmv"
          }
        });
        var mailOptions = {
          from: 'rexxmailservice@gmail.com',
          to: email,
          subject: 'Payment Confirmation - Verification in Progress ',
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <p style="font-size:1.1em">Hi ${mailName}, </p>
            <p>Thank you for your payment. Your transaction has been successfully processed. </p>
             <p style="font-weight:bold">Transaction Details: </p>
            <ul>
                      <li>Amount: ${amountPaid}</li>
                      <li>Date: ${paidDate}</li>
                      <li>Service:Job Application </li>
            </ul>
            <p>Please allow some time for us to reverify your account. We will notify you once the verification is complete. </p>
             <p style="font-size:0.9em;">Best regards,<br />The Rexx Team</p> 
          </div>
        </div>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          console.log("mail sent")
          if (error) {
            console.log(error);
          } else {
            return info.response;
          }
        });
        }

       function sendApplicationSuccessEmail(toEmail, post) {
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rexxmailservice@gmail.com',
          pass:"gtmo ohsd ldxr hwmv"
        },
      });
    
      const { Designation, CompanyName } = post;
      const { paidPrice, percentage, pendingPayment } = post.paymentDetails || {};
    
     
      const mailOptions = {
        from: 'rexxmailservice@gmail.com',
        to: toEmail,
        subject: 'Job Application Successful',
        html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
          <div style="margin: 50px auto; width: 70%; padding: 20px 0">
            <p style="font-size: 1.1em">Hi,</p>
            <p>Congratulations! The Job you have applied for ${Designation} at ${CompanyName} has been accepted. you will be notified with the interview details shortly</p>
            <p>Payment Details:</p>
            <ul>
              <li>Paid Price: ${paidPrice || 0}</li>
              <li>Percentage: ${percentage || 0}</li>
              <li>Payment Status: Accepted Payment</li>
              <li>Payment Pending: ${pendingPayment}</li>
            </ul>
            <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p>
          </div>
        </div>`,
      };
    
      // Send mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Mail sent:', info.response);
        }
      });
       }

       function QuickJobNotificationEmail(toEmail,name,lastName,jobName,venue,startTime,endTime) {
      
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'rexxmailservice@gmail.com',
            pass:"gtmo ohsd ldxr hwmv"
          },
        });
      
        const mailOptions = {
          from: 'rexxmailservice@gmail.com',
          to: toEmail,
          subject: `Job Application Confirmation - ${jobName} `,
          html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
            <div style="margin: 50px auto; width: 70%; padding: 20px 0">
              <p style="font-size: 1.1em">Hi,${name} ${lastName}</p>
              <p>Thank you for applying for the ${jobName} position. Here are the details of your application: </p>
              <p>Job Details:</p>
              <ul>
                <li>Venue: ${venue}</li>
                <li>Timings: ${startTime}-${endTime}</li>
                <li>Position: ${jobName}</li>
              </ul>
              <p>We wish you the best of luck! </p>
              <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p>
              <hr style="border: none; border-top: 1px solid #eee" />
            </div>
          </div>`,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Mail sent:', info.response);
          }
        });
         }

        function sendMailToApplyForTheCourse(toEmail,userOtp){
      console.log(toEmail,userOtp)
      console.log('props')
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'rexxmailservice@gmail.com',
            pass:"gtmo ohsd ldxr hwmv"
          }
        });
        var mailOptions = {
          from: 'rexxmailservice@gmail.com',
          to: toEmail,
          subject: 'New Password',
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Rexx</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Rexx Platform. Use the following OTP to complete your apply course procedure. OTP is valid for 5 minutes</p>
            <h2 style="background: #17145a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">`+userOtp+`</h2>
            <p style="font-size:0.9em;">Regards,<br />Rexx</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Rexx</p>
              <p>India</p>
            </div>
          </div>
        </div>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          console.log("mail sent")
          if (error) {
            console.log(error);
          } else {
            return info.response;
          }
        });
        }

        function sendDocumentApprovalNotification(toEmail, adminName) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
        
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to: toEmail,
            subject: 'Documents Approve Status',
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <div style="border-bottom: 1px solid #eee">
                  <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Rexx</a>
                </div>
                <p style="font-size: 1.1em">Hi,</p>
                <p>Your Documents successfully approved by ${adminName} .</p>
                <p style="font-size: 0.9em;">Regards,<br />Rexx</p>
                <hr style="border: none; border-top: 1px solid #eee" />
                <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                  <p>Rexx</p>
                  <p>India</p>
                </div>
              </div>
            </div>`,
          };
        
          // Send mail
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });
        }

        function sendMailToSubRecruiter(email,password){
          console.log(email,password)
          console.log('props')
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'rexxmailservice@gmail.com',
                pass:"gtmo ohsd ldxr hwmv"
              }
            });
            var mailOptions = {
              from: 'rexxmailservice@gmail.com',
              to: email,
              subject: 'SubRecruiter Credentials',
              html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Rexx</a>
                </div>
                <p style="font-size:1.1em">Hi, </p>
                <p style="font-size:1.1em">Welcome to RexX </p>
                <p style="font-size:0.8em">Your recruiter has successfully signed you up as a sub-recruiter. </p>
                <p style="font-size:0.8em">Log in to RexX with these credentials:</p>
                <ul>
                  <li>Email: ${email}</li>
                  <li>Password: ${password}</li>
                </ul> 
                <p style="font-size:0.9em;">Regards,<br />Rexx</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Rexx</p>
                  <p>India</p>
                </div>
              </div>
            </div>`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              console.log("mail sent")
              if (error) {
                console.log(error);
              } else {
                return info.response;
              }
            });
            }
            
        function admissionApplicationEmail(firstName,lastName,courseName,collegeName,email) {
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rexxmailservice@gmail.com',
                  pass:"gtmo ohsd ldxr hwmv"
                },
              });
            
              const mailOptions = {
                from: 'rexxmailservice@gmail.com',
                to:email,  
                subject: 'Admission Application Verification',
                html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
                  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <p style="font-size: 1.1em">Hi ${firstName} ${lastName},</p>
                    <p>Thank you for applying for the ${courseName} at ${collegeName}. We have received your application and it is currently under review. </p>
                    <p>Please allow some time for us to verify your details. We will notify you once the verification is complete. </p>
                    <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p>  
                  </div>
                </div>`,
              };
            
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Mail sent:', info.response);
                }
              });
            }



        function sendMailToSubIncharge(inchargeEmail,password,firstName){
              console.log(inchargeEmail,password)
              console.log('props')
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'rexxmailservice@gmail.com',
                    pass:"gtmo ohsd ldxr hwmv"
                  }
                });
                var mailOptions = {
                  from: 'rexxmailservice@gmail.com',
                  to: inchargeEmail,
                  subject: 'Your Account Details for Rexx',
                  html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                  <div style="margin:50px auto;width:70%;padding:20px 0">
                    
                    <p style="font-size:1.1em">Hi ${firstName} </p>
                    <p style="font-size:1.1em">Welcome to Rexx! Below are your account</p>
                    <p>details: </p>
                    <ul>
                      <li>Email: ${inchargeEmail}</li>
                      <li>Password: ${password}</li>
                    </ul> 
                    <p>Please change your password after logging in for the first time. If you have any questions, feel free to contact our support team. </p>
                    <p style="font-size:0.9em;">Best Regards,<br />The Rexx Team</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                  </div>
                </div>`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  console.log("mail sent")
                  if (error) {
                    console.log(error);
                  } else {
                    return info.response;
                  }
                });
                } 

        // function sendInterviewUpdate(JobTitle, cN, dates, Time, mode, ven, meetingLink, name) {
    
        //   const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'rexxmailservice@gmail.com',
        //       pass: 'erki ywmr yixb xbmv',
        //     },
        //   });
        
        //   const mailOptions = {
        //     from: 'rexxmailservice@gmail.com',
        //     to: toEmail,
        //     subject: 'Interview Schedule Confirmation',
        //     html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
        //       <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        //         <div style="border-bottom: 1px solid #eee">
        //           <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Rexx</a>
        //         </div>
        //         <p style="font-size: 1.1em">Hi,${name}</p>
        //         <p>I hope this email finds you well. We are pleased to inform you that your interview has been scheduled for the ${JobTitle} position at ${cN}</p>
        //         <p>The details of the interview are as follows:</p>
        //         <ul>
        //           <li>Date: ${dates}}</li>
        //           <li>Time: ${Time}</li>
        //           <li>Mode: ${mode}</li>
        //           <li>Venue: ${ven}</li>
        //           <li>MeetingLink: ${meetingLink}</li>
        //         </ul> 
        //         <p style="font-size: 0.9em;">Regards,<br />Rexx</p>
        //         <hr style="border: none; border-top: 1px solid #eee" />
        //         <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
        //           <p>Rexx</p>
        //           <p>India</p>
        //         </div>
        //       </div>
        //     </div>`,
        //   };
        
        //   transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //       console.error(error);
        //     } else {
        //       console.log('Mail sent:', info.response);
        //     }
        //   });
        // }

        function sendInterviewUpdate(JobTitle, cN, dates, time, modeOfInterView, venue, urlLink, name, toEmail,round) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
        
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to:toEmail,  
            subject: `Interview Invitation - ${round}`,
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0"> 
                <p style="font-size: 1.1em">Hi ${name},</p>
                <p>We are pleased to inform you that you have been shortlisted for the [${round}] round of interviews with ${cN}
                for the ${JobTitle} position. </p>
                <p>please find the interview details below</p>
                <ul>
                  <li>Date: ${dates}</li>
                  <li>Time: ${time}</li>
                  <li>Round: ${round}</li>
                  <li>Mode: ${modeOfInterView}</li>
                  <li>Venue: ${venue}</li>
                  <li>MeetingLink: ${urlLink}</li>

                </ul> 
                <p>Best of luck!</p>
                <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p> 
              </div>
            </div>`,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });
        }
        
        function sendBookingMail(dates,bookingSlotStartTime,bookingSlotEndTime,userName,email,modeofAppointment) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
        
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to:email,  
            subject: 'Mentorship Confirmed',
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <p style="font-size: 1.1em">Hi ${userName},</p>
                <p>We are pleased to confirm your mentorship session. Here are the details: </p>
                <p>Session Details:</p>
               <ul>
                  <li>Date: ${dates}</li>
                  <li>Time: ${bookingSlotStartTime} - ${bookingSlotEndTime}</li>
                  <li>Mode of Communication: ${modeofAppointment}</li>
              </ul>
              <p>If you have any questions, please reach out to our support team. </p>
                <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p>
                
                
              </div>
            </div>`,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });
        }

        function sendNominationMail(inchargeName, candidateName, postName, postDesignation, postId,candidateEmail) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
        
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to:candidateEmail,  // Replace with the actual recipient's email address
            subject: 'Nomination Update',
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <div style="border-bottom: 1px solid #eee">
                  <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Rexx</a>
                </div>
                <p style="font-size: 1.1em">Hi, ${candidateName}</p>
                <p>I hope this email finds you well. You have been successfully nominated by the ${inchargeName}for the post at ${postName} for ${postDesignation}</p>
                <p style="font-size: 0.9em;">Regards,<br />Rexx</p>
                <hr style="border: none; border-top: 1px solid #eee" />
                <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                  <p>Rexx</p>
                  <p>India</p>
                </div>
              </div>
            </div>`,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });
        }

        function sendAdmissionMeeting(venue, startTime, endTime, contactDetails, meetingType, admissionId, meetingDate, meetingLink,email,inchargeName) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
       
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to:email,  // Replace with the actual recipient's email address
            subject: 'Admission Meeting Details',
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <div style="border-bottom: 1px solid #eee">
                  <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Rexx</a>
                </div>
                <p style="font-size: 1.1em">Hi</p>
                <p>I hope this email finds you well. We are pleased to inform you that your Admission Meeting  has been scheduled with ${inchargeName} .</p>
                <p>The details of the interview are as follows:</p>
                <ul>
                  <li>Venue: ${venue}</li>
                  <li>StartTime: ${startTime}</li>
                  <li>EndTime: ${endTime}</li>
                  <li>ContactDetails: ${contactDetails}</li>
                  <li>MeetingType: ${meetingType}</li>
                  <li>AdmissionId: ${admissionId}</li>
                  <li>MeetingDate: ${meetingDate}</li>
                  <li>MeetingLink: ${meetingLink}</li>
                </ul>
                <p style="font-size: 0.9em;">Regards,<br />Rexx</p>
                <hr style="border: none; border-top: 1px solid #eee" />
                <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                  <p>Rexx</p>
                  <p>India</p>
                </div>
              </div>
            </div>`,
          };
       
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });
        }

        function sendRemainderEmail(array,startTime,date2) {
          const date = new Date(startTime);
          const indianDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
          const timeIST = indianDate.toLocaleTimeString("en-US", { hour12: false });
         
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rexxmailservice@gmail.com',
              pass:"gtmo ohsd ldxr hwmv"
            },
          });
       
          const mailOptions = {
            from: 'rexxmailservice@gmail.com',
            to:array.join(', '),  
            subject: 'Reminder: Upcoming Mentorship Session ',
            html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                
                <p style="font-size: 1.1em">Hi,</p>
                <p>This is a reminder that your mentorship session is scheduled for: </p>
                <p>Session Details:</p>
               <ul>
                  <li>Date: ${date2}</li>
                  <li>Time:${timeIST}</li>
              </ul>
                <p style="font-size: 0.9em;">Best Regards,<br />The Rexx Team</p>
                
              </div>
            </div>`,
          };
       
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Mail sent:', info.response);
            }
          });
        }

       
        
     
       
          
function convertUTCtoIST(utcDateString) {
  const utcDate = new Date(utcDateString);
  
  // IST is UTC+5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utcDate.getTime() + istOffset);
  
  // Format the IST date as a string
  const istDateString = istDate.toISOString();
  
  return istDateString;
}


const utcDateString = "2024-02-16T05:05:10";
const istDateString = convertUTCtoIST(utcDateString);

console.log("UTC Date:", utcDateString);
console.log("IST Date:", istDateString);


module.exports = {admissionApplicationEmail,sendforgotpasswordMail,QuickJobNotificationEmail,paymentSuccessEmail,BookingPaymentMailsForMentor, BookingPaymentMails,goodByeEmail,internshipRemainder,sendResetPassword,sendWelcomeMail, sendRemainderEmail, sendAdmissionMeeting, sendBookingMail,sendNominationMail, sendMailToSubRecruiter,sendMailToSubIncharge, sendMail,sendRoundStatusEmail,sendApplicationSuccessEmail,sendMailToApplyForTheCourse, convertUTCtoIST,sendDocumentApprovalNotification,sendInterviewUpdate,sendInvitationMail};