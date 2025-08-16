"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import {
  User,
  Phone,
  Mail,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Package,
  Bell
} from "lucide-react"

import {jwtDecode} from 'jwt-decode';

interface UserData {
  userId: number;
  name: string | null;
  email: string | null;
  password: string | null;
  refreshToken: string | null;
  expiryDate: string | null;
  role: string | null;
  phone: string | null;
  address: string | null;
  gender: string | null;
  birthDay: string | null;
  createdAt: string | null;
}

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
}

// --- Reusable View Container ---
const ViewContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">{title}</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl">
            {children}
        </div>
    </div>
);

// --- Tách các View Component ra ngoài component chính ---

const PersonalInfoView = ({ formData, handleFormChange, handlePersonalUpdate }: {
  formData: any,
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  handlePersonalUpdate: () => void
}) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    
    const nationalities = [
        "Việt Nam", "Mỹ", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "Anh", "Pháp", "Đức", "Úc", "Canada"
    ];

    return (
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
                        <select name="birthDay" value={formData.birthDay} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-lg">
                            <option value="">Ngày</option>
                            {days.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                        <select name="birthMonth" value={formData.birthMonth} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-lg">
                            <option value="">Tháng</option>
                            {months.map(month => <option key={month} value={month}>{month}</option>)}
                        </select>
                        <select name="birthYear" value={formData.birthYear} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-lg">
                            <option value="">Năm</option>
                            {years.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                    <div className="flex flex-wrap gap-6">
                        <label className="flex items-center"><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleFormChange} className="mr-2" /><span>Nam</span></label>
                        <label className="flex items-center"><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleFormChange} className="mr-2" /><span>Nữ</span></label>
                        <label className="flex items-center"><input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleFormChange} className="mr-2" /><span>Khác</span></label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quốc tịch</label>
                    <select name="nationality" value={formData.nationality} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Chọn quốc tịch</option>
                        {nationalities.map(nat => <option key={nat} value={nat}>{nat}</option>)}
                    </select>
                </div>
                <button onClick={handlePersonalUpdate} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Lưu thay đổi</button>
            </div>
        </div>
    );
};


const UpdatePhoneView = ({ phoneNumber, onUpdate }: { phoneNumber: string, onUpdate: (newPhoneNumber: string) => void }) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setLocalPhoneNumber(phoneNumber);
    phoneInputRef.current?.focus();
  }, [phoneNumber]);

  const validatePhone = (value: string) => {
      const isValid = /^\d{10}$/.test(value);
      setIsPhoneValid(isValid);
      return isValid;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalPhoneNumber(value);
      validatePhone(value);
  };

  const handleLocalUpdate = () => {
      if (validatePhone(localPhoneNumber)) {
          onUpdate(localPhoneNumber);
      } else {
          alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.");
      }
  };

  return (
    <ViewContainer title="Cập nhật số điện thoại">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      ref={phoneInputRef}
                      type="tel" 
                      value={localPhoneNumber} 
                      onChange={handlePhoneChange} 
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${isPhoneValid ? 'border-gray-300' : 'border-red-500'}`}
                      autoFocus
                    />
                </div>
                {!isPhoneValid && (
                  <p className="text-xs text-red-500 mt-1">Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.</p>
                )}
            </div>
            <button 
              onClick={handleLocalUpdate} 
              disabled={!isPhoneValid || localPhoneNumber.length === 0}
              className={`w-full text-white py-3 rounded-lg font-medium transition-colors ${
                !isPhoneValid || localPhoneNumber.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              Lưu thay đổi
            </button>
        </div>
    </ViewContainer>
  );
};

const UpdateEmailView = ({ email, onUpdate }: { email: string, onUpdate: (newEmail: string) => void }) => {
  const [localEmail, setLocalEmail] = useState(email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  // Regex để kiểm tra định dạng email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    setLocalEmail(email);
    emailInputRef.current?.focus();
  }, [email]);

  const validateEmail = (value: string) => {
      const isValid = emailRegex.test(value);
      setIsEmailValid(isValid);
      return isValid;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalEmail(value);
      validateEmail(value);
  };

  const handleLocalUpdate = () => {
      if (validateEmail(localEmail)) {
          onUpdate(localEmail);
      } else {
          alert("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      }
  };

  return (
    <ViewContainer title="Cập nhật email">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      ref={emailInputRef}
                      type="email" 
                      value={localEmail} 
                      onChange={handleEmailChange} 
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${isEmailValid ? 'border-gray-300' : 'border-red-500'}`}
                      autoFocus
                    />
                </div>
                {!isEmailValid && (
                  <p className="text-xs text-red-500 mt-1">Email không đúng định dạng</p>
                )}
            </div>
            <button 
              onClick={handleLocalUpdate} 
              disabled={!isEmailValid || localEmail.length === 0}
              className={`w-full text-white py-3 rounded-lg font-medium transition-colors ${
                !isEmailValid || localEmail.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              Lưu thay đổi
            </button>
        </div>
    </ViewContainer>
  );
};

const UpdatePasswordView = ({ navigateToHome }: { navigateToHome: (message: string) => void }) => {
  // State và refs
  const [localNewPassword, setLocalNewPassword] = useState("");
  const [localConfirmPassword, setLocalConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  
  // Tắt nút nếu mật khẩu chưa đủ 8 ký tự hoặc không khớp
  const isButtonDisabled = localNewPassword.length < 8 || localNewPassword !== localConfirmPassword;

  useEffect(() => {
    // Focus vào input đầu tiên khi component mount
    passwordInputRef.current?.focus();
  }, []);

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalConfirmPassword(e.target.value);
  };
  
  const handlePasswordUpdate = useCallback(() => {
      if (localNewPassword !== localConfirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
      }
      if (localNewPassword.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
      }
      navigateToHome("Đã cập nhật mật khẩu thành công!");
      // Reset form
      setLocalNewPassword("");
      setLocalConfirmPassword("");
  }, [localNewPassword, localConfirmPassword, navigateToHome]);


  const handleNewPasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmPasswordInputRef.current?.focus();
    }
  };

  const handleConfirmPasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isButtonDisabled) {
      e.preventDefault();
      handlePasswordUpdate();
    }
  };

  return (
      <div className="flex-1 max-w-2xl mx-auto p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Thiết lập mật khẩu</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {/* Mật khẩu mới */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type={showNewPassword ? "text" : "password"}
                  value={localNewPassword}
                  onChange={handleNewPasswordChange}
                  onKeyDown={handleNewPasswordKeyDown}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số
              </p>
            </div>

            {/* Nhập lại mật khẩu mới */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhập lại mật khẩu mới
              </label>
              <div className="relative">
                <input
                  ref={confirmPasswordInputRef}
                  type={showConfirmPassword ? "text" : "password"}
                  value={localConfirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onKeyDown={handleConfirmPasswordKeyDown}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Hiển thị thông báo lỗi nếu mật khẩu không khớp */}
              {localConfirmPassword && localNewPassword !== localConfirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Mật khẩu không khớp
                </p>
              )}
            </div>

            {/* Nút lưu */}
            <button
              onClick={handlePasswordUpdate}
              disabled={isButtonDisabled}
              className={`w-full text-white py-3 rounded-lg font-medium transition-colors ${
                isButtonDisabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              Lưu thay đổi
            </button>

            {/* Hiển thị trạng thái validation */}
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${localNewPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span>Mật khẩu có ít nhất 8 ký tự</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${localNewPassword && localConfirmPassword && localNewPassword === localConfirmPassword ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span>Mật khẩu khớp nhau</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

    const handlePinChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value)) {
            const newPin = [...pin]; newPin[index] = value; setPin(newPin);
            if (index < 3) { inputRefs[index + 1].current?.focus(); }
        } else if (value === '') {
            const newPin = [...pin]; newPin[index] = ''; setPin(newPin);
        }
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
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

// --- Main User Profile Component ---
export default function UserProfile() {
  type View = 'account_info' | 'update_pin' | 'update_phone' | 'update_email' | 'update_password';
  const [currentView, setCurrentView] = useState<View>('account_info');
  
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("...")
  const [email, setEmail] = useState("...")

  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    nationality: "",
  })

  // useEffect để lấy dữ liệu từ API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZXR1YW4wM0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNzU1ODMyOTE5LCJpc3MiOiJzaG9wYm9vay5hcGkiLCJhdWQiOiJzaG9wYm9vay5hcGkudXNlcnMifQ.HJwyXmNT0gBmYngw2vskQSHcwiElHSWOTNOQQW3kXUM";
        
        // Giải mã token để lấy email
        const decodedToken = jwtDecode<JwtPayload>(token);
        const userEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

        const response = await fetch('https://localhost:7061/api/Users/getall', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const users: UserData[] = await response.json();
        
        // Sử dụng email đã giải mã để tìm người dùng
        const currentUser = users.find((user: UserData) => user.email === userEmail);
        
        if (currentUser) {
          setPhoneNumber(currentUser.phone || "...");
          setEmail(currentUser.email || "...");
          setFormData({
            fullName: currentUser.name || "",
            nickname: "", // Dữ liệu nickname không có trong API, giữ nguyên
            birthDay: currentUser.birthDay ? new Date(currentUser.birthDay).getDate().toString() : "",
            birthMonth: currentUser.birthDay ? (new Date(currentUser.birthDay).getMonth() + 1).toString() : "",
            birthYear: currentUser.birthDay ? new Date(currentUser.birthDay).getFullYear().toString() : "",
            gender: currentUser.gender || "",
            nationality: "", // Dữ liệu quốc tịch không có trong API, giữ nguyên
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSuccessMessage(message)
    setShowSuccessNotification(true)
    setTimeout(() => {
      setShowSuccessNotification(false)
    }, 3000)
  }, []);
  
  const navigateToHome = useCallback((message: string) => {
      showSuccess(message);
      setCurrentView('account_info');
  }, [showSuccess]); 

  const handlePhoneUpdate = useCallback((newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
    navigateToHome("Đã cập nhật số điện thoại thành công!")
  }, [navigateToHome]); 

  const handleEmailUpdate = useCallback((newEmail: string) => {
    setEmail(newEmail);
    navigateToHome("Đã cập nhật email thành công!")
  }, [navigateToHome]);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePersonalUpdate = useCallback(() => {
    console.log("Personal info updated:", formData);
    showSuccess("Đã lưu thay đổi thông tin cá nhân!");
  }, [formData, showSuccess]);

  const renderView = () => {
    switch(currentView) {
        case 'account_info':
            return <><PersonalInfoView 
                formData={formData} 
                handleFormChange={handleFormChange} 
                handlePersonalUpdate={handlePersonalUpdate} 
            /><RightSidebar/></>;
        case 'update_pin':
            return <UpdatePinView onPinUpdated={navigateToHome} />;
        case 'update_phone':
            return <UpdatePhoneView phoneNumber={phoneNumber} onUpdate={handlePhoneUpdate} />;
        case 'update_email':
            return <UpdateEmailView email={email} onUpdate={handleEmailUpdate} />;
        case 'update_password':
            return <UpdatePasswordView navigateToHome={navigateToHome} />;
        default:
            return <><PersonalInfoView 
                formData={formData} 
                handleFormChange={handleFormChange} 
                handlePersonalUpdate={handlePersonalUpdate} 
            /><RightSidebar/></>;
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
        <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tài khoản của</div>
                  <div className="font-semibold text-gray-800">{formData.fullName || "Người dùng"}</div>
                </div>
              </div>

              <nav className="space-y-1">
                <div className="flex items-center space-x-3 text-sm font-medium text-gray-800 p-3 bg-gray-100 rounded">
                  <User className="w-4 h-4" />
                  <span>Thông tin tài khoản</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <Bell className="w-4 h-4" />
                  <span>Thông báo của tôi</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <Package className="w-4 h-4" />
                  <span>Quản lý đơn hàng</span>
                </div>
              </nav>
            </div>
          </div>
        
        {renderView()}

      </div>
    </main>
  )
}