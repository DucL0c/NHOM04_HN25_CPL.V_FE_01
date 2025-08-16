"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import {
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react"

// --- Reusable View Container ---
const ViewContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">{title}</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl">
            {children}
        </div>
    </div>
);

// --- Main User Profile Component ---
export default function UserProfile() {
  type View = 'account_info' | 'update_pin' | 'update_phone' | 'update_email' | 'update_password';
  const [currentView, setCurrentView] = useState<View>('account_info');
  
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("0853202619")
  const [email, setEmail] = useState("vuavolam456@gmail.com")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "kimngan pham",
    nickname: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "female",
    nationality: "",
  })

  const showSuccess = useCallback((message: string) => {
    setSuccessMessage(message)
    setShowSuccessNotification(true)
    setTimeout(() => {
      setShowSuccessNotification(false)
    }, 3000)
  }, []);
  
  const navigateToHome = (message: string) => {
      showSuccess(message);
      setCurrentView('account_info');
      // Reset password fields after update
      setNewPassword("");
      setConfirmPassword("");
  }

  const handlePhoneUpdate = useCallback(() => {
    navigateToHome("Đã cập nhật số điện thoại thành công!")
  }, [showSuccess]);

  const handleEmailUpdate = useCallback(() => {
    navigateToHome("Đã cập nhật email thành công!")
  }, [showSuccess]);

  const handlePasswordUpdate = useCallback(() => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu không khớp!")
      return
    }
    if (newPassword.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự!")
      return
    }
    navigateToHome("Đã cập nhật mật khẩu thành công!")
  }, [newPassword, confirmPassword, showSuccess]);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePersonalUpdate = useCallback(() => {
    console.log("Personal info updated:", formData);
    showSuccess("Đã lưu thay đổi thông tin cá nhân!");
  }, [formData, showSuccess]);

  // --- View Components ---

  const PersonalInfoView = () => (
     <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Thông tin tài khoản</h1>
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Thông tin cá nhân</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center"><User className="w-10 h-10 text-blue-600" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ & Tên</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nickname</label>
              <input type="text" name="nickname" placeholder="Thêm nickname" value={formData.nickname} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
            <div className="flex flex-wrap gap-3">
              <select name="birthDay" onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-lg"><option>Ngày</option></select>
              <select name="birthMonth" onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-lg"><option>Tháng</option></select>
              <select name="birthYear" onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-lg"><option>Năm</option></select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center"><input type="radio" name="gender" value="male" onChange={handleFormChange} className="mr-2" /><span>Nam</span></label>
              <label className="flex items-center"><input type="radio" name="gender" value="female" defaultChecked onChange={handleFormChange} className="mr-2" /><span>Nữ</span></label>
              <label className="flex items-center"><input type="radio" name="gender" value="other" onChange={handleFormChange} className="mr-2" /><span>Khác</span></label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quốc tịch</label>
            <select name="nationality" onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option>Chọn quốc tịch</option></select>
          </div>
          <button onClick={handlePersonalUpdate} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Lưu thay đổi</button>
        </div>
      </div>
  );

  const UpdatePhoneView = () => (
    <ViewContainer title="Cập nhật số điện thoại">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>
            <button onClick={handlePhoneUpdate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">Lưu thay đổi</button>
        </div>
    </ViewContainer>
  );
  
  const UpdateEmailView = () => (
      <ViewContainer title="Cập nhật email">
          <div className="space-y-6">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ email</label>
                  <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
              </div>
              <button onClick={handleEmailUpdate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">Lưu thay đổi</button>
          </div>
      </ViewContainer>
  );

  const UpdatePasswordView = () => {
      const isButtonDisabled = newPassword.length < 8 || newPassword !== confirmPassword;
      return (
          <ViewContainer title="Thiết lập mật khẩu">
              <div className="space-y-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                      <div className="relative">
                          <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nhập mật khẩu mới" className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg" />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nhập lại mật khẩu mới</label>
                      <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu mới" className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg" />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                      </div>
                  </div>
                  <button onClick={handlePasswordUpdate} disabled={isButtonDisabled} className={`w-full text-white py-3 rounded-lg font-medium transition-colors ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>Lưu thay đổi</button>
              </div>
          </ViewContainer>
      );
  };
  
  const UpdatePinView = ({ onPinUpdated }: { onPinUpdated: (message: string) => void }) => {
      const [pinStep, setPinStep] = useState<'enter_old' | 'enter_new'>('enter_old');
      const [pin, setPin] = useState(['', '', '', '']);
      const [error, setError] = useState('');
      const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

      useEffect(() => {
          if (pin.join('').length === 4) {
              if (pinStep === 'enter_old') {
                  const correctOldPin = '1234';
                  if (pin.join('') === correctOldPin) {
                      setPinStep('enter_new');
                      setPin(['', '', '', '']);
                      setError('');
                      inputRefs[0].current?.focus();
                  } else {
                      setError('Mã PIN không đúng. Vui lòng thử lại.');
                      setPin(['', '', '', '']);
                      inputRefs[0].current?.focus();
                  }
              } else if (pinStep === 'enter_new') {
                  console.log("New PIN set:", pin.join(''));
                  onPinUpdated("Đã cập nhật mã PIN thành công!");
              }
          } else {
              if (error) setError('');
          }
      }, [pin, pinStep, onPinUpdated, error]);

      const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
          const { value } = e.target;
          if (/^[0-9]$/.test(value)) {
              const newPin = [...pin]; newPin[index] = value; setPin(newPin);
              if (index < 3) { inputRefs[index + 1].current?.focus(); }
          } else if (value === '') {
              const newPin = [...pin]; newPin[index] = ''; setPin(newPin);
          }
      };
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
          if (e.key === 'Backspace' && pin[index] === '' && index > 0) { inputRefs[index - 1].current?.focus(); }
      };
      const texts = { enter_old: { title: "Nhập mã PIN cũ", label: "Xác nhận lại mã PIN" }, enter_new: { title: "Nhập mã PIN mới", label: "Nhập mã PIN gồm 4 số" } };

      return (
          <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900 mb-6">Cập nhật mã PIN</h1>
              <div className="bg-white rounded-lg shadow-sm p-8 flex items-center justify-center min-h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full max-w-3xl">
                      <div className="text-center flex flex-col items-center">
                          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6"><Shield className="w-12 h-12 text-blue-600" /></div>
                          <h2 className="text-2xl font-semibold text-gray-900">{texts[pinStep].title}</h2>
                          <p className="text-gray-600 mt-2 text-sm">Thiết lập mã PIN để bảo vệ tài khoản của bạn</p>
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-3">{texts[pinStep].label}</label>
                          <div className="flex gap-3">
                              {pin.map((digit, index) => (
                                  <input key={index} ref={inputRefs[index]} type="password" maxLength={1} value={digit} onChange={(e) => handlePinChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} className={`w-14 h-16 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg text-center text-3xl font-medium`} />
                              ))}
                          </div>
                          <div className="h-6 mt-2">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
                          {pinStep === 'enter_old' && (<div className="text-left mt-2"><button className="text-blue-600 text-sm hover:underline font-medium">Quên mã PIN?</button></div>)}
                      </div>
                  </div>
              </div>
          </div>
      );
  };
  
  const renderView = () => {
      switch(currentView) {
          case 'account_info':
              return <><PersonalInfoView /><RightSidebar/></>;
          case 'update_pin':
              return <UpdatePinView onPinUpdated={navigateToHome} />;
          case 'update_phone':
              return <UpdatePhoneView />;
          case 'update_email':
              return <UpdateEmailView />;
          case 'update_password':
              return <UpdatePasswordView />;
          default:
              return <><PersonalInfoView /><RightSidebar/></>;
      }
  };

  const RightSidebar = () => (
    <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">Số điện thoại và Email</h3>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500 mt-1" />
                        <div>
                            <span className="text-sm text-gray-600">Số điện thoại</span>
                            <p className="text-sm text-gray-900">{phoneNumber}</p>
                        </div>
                    </div>
                    <button onClick={() => setCurrentView('update_phone')} className="text-blue-600 text-sm border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">Cập nhật</button>
                </div>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500 mt-1" />
                        <div>
                            <span className="text-sm text-gray-600">Địa chỉ email</span>
                            <p className="text-sm text-gray-900">{email}</p>
                        </div>
                    </div>
                    <button onClick={() => setCurrentView('update_email')} className="text-blue-600 text-sm border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">Cập nhật</button>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">Bảo mật</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png" alt="Lock icon" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">Thiết lập mật khẩu</span>
                    </div>
                    <button onClick={() => setCurrentView('update_password')} className="text-blue-600 text-sm border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">Cập nhật</button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="https://salt.tikicdn.com/ts/upload/99/50/d7/cc0504daa05199e1fb99cd9a89e60fa5.jpg" alt="PIN icon" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">Cập nhật mã PIN</span>
                    </div>
                    <button onClick={() => setCurrentView('update_pin')} className="text-blue-600 text-sm border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">Cập nhật</button>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">Liên kết mạng xã hội</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/facebook.png" alt="Facebook icon" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">Facebook</span>
                    </div>
                    <button className="text-blue-600 text-sm border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">Liên kết</button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/google.png" alt="Google icon" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">Google</span>
                    </div>
                    <span className="text-gray-500 text-sm border border-gray-300 rounded px-4 py-1">Đã liên kết</span>
                </div>
            </div>
        </div>
    </div>
);
  
  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-4 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><User className="w-6 h-6 text-blue-600" /></div>
            <div>
              <p className="font-medium text-gray-900">Tài khoản của</p>
              <p className="text-sm text-gray-600">kimngan pham</p>
            </div>
          </div>
          <nav className="space-y-1">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('account_info'); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${currentView === 'account_info' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}>
              <User className="w-4 h-4" />
              <span>Thông tin tài khoản</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"><Shield className="w-4 h-4" /><span>Thông báo của tôi</span></a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"><Calendar className="w-4 h-4" /><span>Quản lý đơn hàng</span></a>
          </nav>
        </div>
        
        {renderView()}

      </div>
    </main>
  )
}