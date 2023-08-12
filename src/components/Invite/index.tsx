import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Email from '@/components/Invite/email'
import './index.less'
import Title from '@/components/Invite/title'
import { Tabs } from 'antd'
import Link from '@/components/Invite/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Invite: React.FunctionComponent = () => {
  const flag = useSelector((state: RootState) => state.stateFlag.value)
  if (flag == true) {
    return ReactDOM.createPortal(
      <div className='invite-modal'>
        <Title />
        <Tabs
          defaultActiveKey='1'
          centered
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1)
            if (id == 1) {
              return {
                label: `链接邀请`,
                key: id,
                children: <Link />,
              }
            } else {
              return {
                label: `邮箱邀请`,
                key: id,
                children: <Email />,
              }
            }
          })}
        />
      </div>,
      document.body,
    )
  }
}

export default Invite
