import IconLocation from "../../assets/img/draft/iconlocation.png"
import IconPhone from "../../assets/img/draft/iconphone.png"
import IconGlobe from "../../assets/img/draft/iconglobe.png"
import { SvgLogoYootFooter } from '../../assets/svg/SvgLogoYootFooter';
import './Footer.scss'
export const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className='footer__company'>
        <div className="footer__company-description">
          <div className="footer__logo">
            {/* <img src={LogoYoot} alt="" /> */}
            <SvgLogoYootFooter/>
          </div>
          <p className="footer__title">Công Ty TNHH Công Nghệ và Đào Tạo YOOT Là Đơn Vị Tạo Ra Ứng Dụng YOOT Với Thông Điệp - Hướng Nghiệp Trọn Vẹn</p>
        </div>
        <div className="footer__company-info">
          <div className='footer__company-name'>CÔNG TY TNHH CÔNG NGHỆ VÀ ĐÀO TẠO YOOT</div>
          <div className="footer__content-detail">
            <div className="footer__content--item">
              <img className="footer__content--item-icon" src={IconLocation} alt="location" />
              <p style={{ display: 'inline-block' }}>Tòa nhà The Gold View, 346 Bến Vân Đồn, Phường 1, Quận 4, TP. HCM</p>
            </div>
            <p className="footer__content--item">
              <span>
                <img className="footer__content--item-icon" src={IconPhone} alt="location" />
              </span>
              Hotline: 1800 888 887
            </p>
            <p className="footer__content--item">
              <span>
                <img className="footer__content--item-icon" src={IconGlobe} alt="location" />
              </span>
              <span>
                Website:&nbsp;
                <a href="https://yoot.vn" target="_blank">
                  https://yoot.vn/
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
