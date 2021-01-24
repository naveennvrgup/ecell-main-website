import React, { Component } from 'react'
import './form.css'
import faxios from '../../../axios'
import BtnLoader from '../../Form/loader'
import { Link } from 'react-router-dom';
export default class form extends Component {

    state={
        err:false,
        success:false,
        loader:false,
        errmsg:''
    }

    _submit=(e)=>{
        e.preventDefault()
        this.setState({
            success:false,
            err: false,
            loader:true
        })

        if(this.your_name.value.length<1){
            this.setState({
                success:false,
                err: true,
                errmsg: 'Name is required',
                loader:false
            })
            return
        }

        if(this.email.value.length<1){
            this.setState({
                success:false,
                err: true,
                errmsg: 'Email is required',
                loader:false
            })
            return
        }

        let email_value= this.email.value

        let verify_email=(email)=>{
            let re = /\S+@\S+\.\S+/;
            return re.test(String(email).toLowerCase());
        }

        if(verify_email(email_value)===false){
            this.setState({
                success:false,
                err: true,
                errmsg: 'Email is invalid',
                loader:false
            })
            return
        }

        if(this.message.value.length<10){
            this.setState({
                success:false,
                err: true,
                errmsg: `Atleast 10 characters are required in your message, you are currently using ${this.message.value.length} characters `,
                loader:false
            })
            return
        }

        if(this.message.value.length>100){
            this.setState({
                success:false,
                err: true,
                errmsg: `You can only send 100 chars max, currently you are using ${this.message.value.length} chars `,
                loader:false
            })
            return
        }

        faxios().post('/feedback/post/',{
            name:this.your_name.value,
            email:this.email.value,
            message:this.message.value
        }).then(res=>{
            console.log(res)

            this.your_name=""
            this.email=""
            this.message=""
            
            this.setState({
                success:true,
                err:false,
                loader:false
            })

            

        }).catch(res=>{
            console.log(res)
            this.setState({
                success:false,
                err:true,
                loader:false,
                errmsg:"Something went wrong, please try later."
            })

            setTimeout(()=>{
                this.setState({
                    err: false,
                    success: false,
                    loader:false,
                    errmsg:''
                })
            },3000)
        })
    }

    contactUs(errrmsg, scsmsg) {
        return (
            <>
            <h4 className="sub-head">Leave a Message</h4>
            {this.state.err ? errrmsg:null}
            {this.state.success ? scsmsg:null}
            <form>
                <div><input ref={ele=>this.your_name = ele} type="text" name="Name" id="visitor-name" placeholder="Your Name"></input></div>
                <div><input ref={ele=>this.email = ele} id="visitor-email" type="email" placeholder="Your Email"></input></div>
                <div><textarea ref={ele=>this.message = ele} id="message" rows="3" placeholder="Your message"></textarea></div>
                <div><button onClick={this._submit} className="submit" type="submit">{this.state.loader ? <BtnLoader/>:"SUBMIT"}</button></div>
            </form>
            </>
        )
    }

    footerSection() {
        return (
            <>
                <h4 className="sub-head">Leaders Beyond Borders</h4>
                <p className="summary">E-Cell, NIT Raipur is established to motivate and educate people about entrepreneurship and serve as a meeting ground for corporate and young budding entrepreneurs from distinguished institutions.</p>
                <div className="mobile-number">
                    <h6>+91 80949 66697</h6>
                    <h6>+91 88395 79796</h6>
                </div>
                <div className="legal">
                    <Link to='/terms'>Terms and Conditions</Link><br></br>
                    <Link to="/policy">Privacy Policy</Link>
                </div>
                <div className="social-icons">
                    <h5>Follow us Online On</h5>
                    <a href="https://www.facebook.com/ecellnitrr/" target="_blank"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.youtube.com/channel/UCrlm4gpLnIaA3pKSXbB99Yw" target="_blank"><i class="fab fa-youtube"></i></a>
                    <a href="https://in.linkedin.com/company/entrepreneurship-cell-nit-raipur" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/ecell.nitraipur/?hl=en" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
            </>
        )
    }

    render() {

        const errrmsg = <div className="my-3 text-danger font-weight-bold text-center">{this.state.errmsg}</div>
        const scsmsg = <div className="my-3 text-success font-weight-bold text-center">Your message is successfully received.</div>

        return (                
                <div className="container-fluid ctn-6">
                    <div className="contact-heading">
                    <h1>Contact Us</h1>
                    <div className="mx-auto" style={{ width: "200px" }}>
                        <div className="heading-line"></div>
                    </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe 
                                    loading='lazy' 
                                    className="embed-responsive-item" 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.5453983644497!2d81.60270025099706!3d21.249868185498716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dde241e3e46d%3A0xf42216385880421e!2sEntrepreneurship+Cell!5e0!3m2!1sen!2sin!4v1561393367581!5m2!1sen!2sin" 
                                    width="600" 
                                    height="400" 
                                    frameBorder="0" 
                                    allowFullScreen
                                    ></iframe>
                            </div>                          
                            
                        </div> */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 form-section" style={{ textAlign: "center", padding: "0 30px"}}>
                            {this.contactUs(errrmsg, scsmsg)}
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 info-section" style={{ textAlign: "center", padding: "10px" }}>
                            {this.footerSection()}
                        </div>
                    </div>
                </div>
            
        )
    }
}
