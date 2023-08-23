import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Layout,App } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { Menu, message } from 'antd'
import type { MenuProps } from 'antd'
import request from '@/api/request'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import login from '@/api/login'
import randomNum from '@/utils/randomNum'
const { Header, Content } = Layout

type LoginType = {
  usernameOrEmail: string
  password: string
  remember: string
}
interface RegisterType {
  username: string
  password: string
  email: string
  phone: string
  avatar_url: string
}
const items: MenuProps['items'] = [
  {
    label: '注册',
    key: 'register',
    // icon: <MailOutlined />,
  },
  {
    label: '登录',
    key: 'login',
    // icon: <AppstoreOutlined />,
  },
]

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('login')
  /**
   * 生成[min,max)区间的随机整数
   * @param min 最小值
   * @param max 最大值
   * @returns 
   */
  
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  const onFinish = (values: any) => {
    let loginData: LoginType
    let registerData: RegisterType
    current === 'login'
      ? ((loginData = {
          usernameOrEmail: values.log_username,
          password: values.log_password,
          remember: values.remember,
        }),
        login(loginData).then(
          (res:any) => {
            res.data.code === 200
              ? (message.success('登录成功'),
                localStorage.setItem('token', res.data.data.token),
                localStorage.setItem('user_id', res.data.data.user.id),
                setTimeout(() => {
                  navigate('/')
                }, 1200))
              : message.error('登录失败')
          },
          (err) => {
            message.error('请求失败', err)
          },
        ))
      : ((registerData = {
          username: values.reg_username,
          password: values.reg_password,
          avatar_url: `src/assets/images/avatar${randomNum(1,6)}.jpg`,
          email: values.email,
          phone: values.phone,
        }),
        request.post('v1/user/checkExist', registerData, {}).then((res) => {
          if (res.data.code === 200) {
            request.post('v1/user/register', registerData, {}).then((res1) => {
              res1.data.code === 200 ? message.success('注册成功') : ''
            })
          } else {
            message.error('用户名或邮箱已被注册')
          }
        }))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <App>
      <HeaderNav ifHideUser={false} />
      <Content
        style={{ backgroundColor: '#fbf7ff', height: '89vh', width: '100vw' }}
      >
        <Menu
          onClick={onClick}
          style={{
            width: '100%',
            backgroundColor: '#fbf7ff',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
          selectedKeys={[current]}
          mode='horizontal'
          items={items}
        />
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<any>
            label={current === 'login' ? '用户名或邮箱' : '用户名'}
            name={current === 'login' ? 'log_username' : 'reg_username'}
            rules={[
              {
                required: true,
                message:
                  current === 'login' ? '输入用户名或邮箱!' : '输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<any>
            label='密码'
            name={current === 'login' ? 'log_password' : 'reg_password'}
            rules={[{ required: true, message: '输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          {current === 'login' ? (
            <Form.Item<LoginType>
              name='remember'
              valuePropName='checked'
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>下次自动登录</Checkbox>
            </Form.Item>
          ) : (
            <>
              <Form.Item<any>
                label='邮箱'
                name='email'
                rules={[{ required: true, message: '输入邮箱!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<any>
                label='手机号'
                name='phone'
                rules={[{ required: true, message: '输入手机号码!' }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              {/* {current==='login'?'登录':'注册'} */}
              提交
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </App>
  )
}

export default Login
