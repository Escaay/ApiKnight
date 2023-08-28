import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import type { ChildrenProps } from './type.d.ts'
const HeaderNav: React.FC<ChildrenProps> = (props) => {
  let { ifHideUser, user_info } = props

  // 默认值
  ifHideUser ? '' : (ifHideUser = false)
  user_info ? '' : (user_info = {})
  return (
    // left
    <div className='header-nav'>
      <div className='left'>
        <div className='title'>
          <i>ApiKnight</i>
        </div>
      </div>

      {/* right */}
      <div className='right'>
        <div className='github'>
          <div className='url'>
            <a href='https://github.com/ApiKnight' target='_blank'>
              <Avatar
                size={54}
                style={{ backgroundColor: 'black' }}
                icon={<GithubOutlined />}
                alt='用户头像'
              />
            </a>
          </div>
        </div>
        {ifHideUser ? (
          ''
        ) : (
          <div className='user'>
            <div className='avatar'>
              <Link
                to='/user'
                state={{ user_id: localStorage.getItem('user_id') }}
              >
                <Avatar
                  size={54}
                  style={{ backgroundColor: 'black', marginLeft: '10px' }}
                  icon={user_info.avatar_url ? '' : <UserOutlined />}
                  src={user_info.avatar_url ? user_info.avatar_url : null}
                />
              </Link>
            </div>

            <div className='name'>
              {user_info.username ? user_info.username : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default HeaderNav
