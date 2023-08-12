import React from 'react'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
import RenderTree from '@/components/RenderTree'
import { ArrayItem } from '@/types/arrayToTree'
import { FlatItem, FlatItemValue } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import Email from '@/components/Invite/email'
import Invite from '@/components/Invite'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { reversal } from '@/store/modules/stateFlag'
const ApiMgt: React.FunctionComponent = () => {
  const a1: FlatItem[] = [
    {
      id: '1',
      name: '根目录',
      project_id: 100,
      parent_id: null,
    },
    {
      id: '2',
      name: '接口目录1',
      project_id: 100,
      parent_id: '1',
    },
    {
      id: '3',
      name: '接口目录1',
      project_id: 100,
      parent_id: '1',
    },
  ]
  const a2: FlatItem[] = [
    {
      id: '4',
      name: 'getList',
      project_id: 100,
      parent_id: '3',
    },
  ]
  const dd: ArrayItem[] = mergeFlatArrays(a1, a2, 100)
  const cs: FlatItemValue = {
    value_1: a1,
    value_2: a2,
    target: 100,
  }
  const d: ArrayItem[] = [
    {
      key: '1',
      title: { key: '1', title: '根目录', pid: null, type: 'FILE' },
      type: 'FILE',
      pid: null,
    },
    {
      key: '2',
      title: { key: '2', title: '接口目录1', pid: '1', type: 'FILE' },
      type: 'FILE',
      pid: '1',
    },
    {
      key: '3',
      title: { key: '3', title: '接口目录2', pid: '1', type: 'FILE' },
      type: 'FILE',
      pid: '1',
    },
    {
      key: '4',
      title: { key: '4', title: 'getList', pid: '3', type: 'GET' },
      type: 'GET',
      pid: '3',
    },
  ]
  console.log(dd)
  console.log(d)
  const dispatch = useDispatch()
  function show(): void {
    dispatch(reversal())
  }
  return (
    <>
      <div>
        <Invite></Invite>
      </div>
      <Button onClick={show}>显示邀请组件</Button>
      <div>ApiMgt</div>
      <ul>
        <li>
          <Link to='/project/apiMgt/overview'>Overview</Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi'>CertainApi</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
      {/* <RenderTree data={dd} /> */}
    </>
  )
}

export default ApiMgt
