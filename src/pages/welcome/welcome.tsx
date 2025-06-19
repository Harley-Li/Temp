import React, { useState } from 'react';
import './welcome.scss';
import { 
  ThemeProvider, 
  GlassBackground, 
  GlassThemeSwitcher,
  GlassButton,
  GlassCheckbox,
  GlassRadio,
  GlassRadioGroup
} from '../../components/core';

const Welcome: React.FC = () => {
  const [activeSection, setActiveSection] = useState('buttons');
  const [checkboxState, setCheckboxState] = useState({
    option1: false,
    option2: true,
    option3: false,
  });
  const [radioValue, setRadioValue] = useState('option2');
  
  const handleCheckboxChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState({
      ...checkboxState,
      [name]: e.target.checked
    });
  };
  
  const handleRadioChange = (value: string) => {
    setRadioValue(value);
  };
  
  const navigateToAdmin = () => {
    window.location.href = '/admin';
  };

  return (
    <ThemeProvider>
      <GlassBackground>
        <div className="welcome-container glass-welcome">
          <div className="switcher-wrapper">
            <GlassThemeSwitcher />
          </div>
          
          <div className="welcome-content">
            <h1>Component Showcase</h1>
            <p>Glass UI Component Library Examples</p>
            
            <div className="component-nav">
              <GlassButton 
                variant={activeSection === 'buttons' ? 'primary' : 'secondary'} 
                onClick={() => setActiveSection('buttons')}
              >
                Buttons
              </GlassButton>
              <GlassButton 
                variant={activeSection === 'inputs' ? 'primary' : 'secondary'} 
                onClick={() => setActiveSection('inputs')}
              >
                Form Inputs
              </GlassButton>
              <GlassButton 
                variant={activeSection === 'switchers' ? 'primary' : 'secondary'} 
                onClick={() => setActiveSection('switchers')}
              >
                Switchers
              </GlassButton>
              <GlassButton 
                variant={activeSection === 'cards' ? 'primary' : 'secondary'} 
                onClick={() => setActiveSection('cards')}
              >
                Cards
              </GlassButton>
            </div>
            
            {activeSection === 'buttons' && (
              <div className="component-section">
                <h2>Button Components</h2>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
                  {/* 基础按钮 */}
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Basic Buttons</h3>
                    <div className="button-row">
                      <GlassButton variant="primary">Primary Button</GlassButton>
                      <GlassButton variant="secondary">Secondary Button</GlassButton>
                      <GlassButton variant="border">Border Button</GlassButton>
                    </div>
                  </div>
                  
                  {/* 带图标的按钮 */}
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Buttons with Icons</h3>
                    <div className="button-row">
                      <GlassButton 
                        variant="primary"
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        }
                      >
                        Add Item
                      </GlassButton>
                      
                      <GlassButton 
                        variant="secondary"
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        }
                      >
                        Confirm
                      </GlassButton>
                      
                      <GlassButton 
                        variant="border"
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        }
                      >
                        Cancel
                      </GlassButton>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  {/* 仅图标按钮 */}
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Icon-only Buttons</h3>
                    <div className="button-row">
                      <GlassButton 
                        variant="primary"
                        iconOnly
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        }
                        aria-label="Add"
                      />
                      
                      <GlassButton 
                        variant="secondary"
                        iconOnly
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        }
                        aria-label="Message"
                      />
                      
                      <GlassButton 
                        variant="border"
                        iconOnly
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        }
                        aria-label="Add"
                      />
                    </div>
                  </div>
                  
                  {/* 禁用状态 */}
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Disabled State</h3>
                    <div className="button-row">
                      <GlassButton variant="primary" disabled>Disabled Primary</GlassButton>
                      <GlassButton variant="secondary" disabled>Disabled Secondary</GlassButton>
                      <GlassButton variant="border" disabled>Disabled Border</GlassButton>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'inputs' && (
              <div className="component-section">
                <h2>Form Input Components</h2>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
                  {/* 复选框展示 */}
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Checkboxes</h3>
                    <div className="form-control-group">
                      <GlassCheckbox 
                        label="Option One" 
                        checked={checkboxState.option1}
                        onChange={handleCheckboxChange('option1')}
                      />
                      <GlassCheckbox 
                        label="Option Two (checked by default)" 
                        checked={checkboxState.option2}
                        onChange={handleCheckboxChange('option2')}
                      />
                      <GlassCheckbox 
                        label="Option Three" 
                        checked={checkboxState.option3}
                        onChange={handleCheckboxChange('option3')}
                      />
                      <GlassCheckbox 
                        label="Disabled Option (unchecked)" 
                        disabled
                      />
                      <GlassCheckbox 
                        label="Disabled Option (checked)" 
                        checked
                        disabled
                      />
                    </div>
                  </div>
                  
                  {/* 单选按钮展示 */}
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Radio Buttons</h3>
                    <div className="form-control-group">
                      <GlassRadio 
                        name="radioExample" 
                        value="option1" 
                        label="Option One"
                        checked={radioValue === "option1"}
                        onChange={() => handleRadioChange("option1")}
                      />
                      <GlassRadio 
                        name="radioExample" 
                        value="option2" 
                        label="Option Two"
                        checked={radioValue === "option2"}
                        onChange={() => handleRadioChange("option2")}
                      />
                      <GlassRadio 
                        name="radioExample" 
                        value="option3" 
                        label="Option Three"
                        checked={radioValue === "option3"}
                        onChange={() => handleRadioChange("option3")}
                      />
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Horizontal Radio Buttons</h3>
                    <div className="form-control-group" style={{ flexDirection: 'row', gap: '1.25rem', flexWrap: 'wrap' }}>
                      <GlassRadio 
                        name="radioHorizontal" 
                        value="option1" 
                        label="Option One"
                        checked={radioValue === "option1"}
                        onChange={() => handleRadioChange("option1")}
                      />
                      <GlassRadio 
                        name="radioHorizontal" 
                        value="option2" 
                        label="Option Two"
                        checked={radioValue === "option2"}
                        onChange={() => handleRadioChange("option2")}
                      />
                      <GlassRadio 
                        name="radioHorizontal" 
                        value="option3" 
                        label="Option Three"
                        checked={radioValue === "option3"}
                        onChange={() => handleRadioChange("option3")}
                      />
                    </div>
                  </div>
                  
                  <div className="showcase-row" style={{ flex: '1', minWidth: '280px' }}>
                    <h3>Disabled Radio Buttons</h3>
                    <div className="form-control-group">
                      <GlassRadio name="radioDisabled1" value="disabled1" label="Disabled Option (unchecked)" disabled />
                      <GlassRadio name="radioDisabled2" value="disabled2" label="Disabled Option (checked)" checked disabled />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'switchers' && (
              <div className="component-section">
                <h2>Switcher Components</h2>
                <div className="showcase-row">
                  <h3>Theme Switcher</h3>
                  <div className="centered-row">
                    <GlassThemeSwitcher />
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'cards' && (
              <div className="component-section">
                <h2>Card Components</h2>
                <p>Card component examples will be added in the future...</p>
              </div>
            )}
            
            <div className="bottom-actions">
              <GlassButton variant="primary" onClick={navigateToAdmin}>
                Go to Admin
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassBackground>
    </ThemeProvider>
  );
};

export default Welcome; 