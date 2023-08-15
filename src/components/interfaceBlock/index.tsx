import React, { useState } from 'react'
import './index.less'
import AddBtn from './addBtn.tsx'
import DelBtn from './delBtn.tsx'
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor'
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor'
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor'
import { createXhrMonitor } from '../../../sdk/createXhrMonitor'
import { TitleNode, Props, AddData } from '@/types/treeComponents'
import MethodList from '@/components/MethodList'
import Menu from "@/components/InterfaceBlock/menu";

function startMonitor() {
  createJsErrorMonitor('renderTree').start()
  createResourceErrorMonitor('renderTree').start()
  createPromiseErrorMonitor('renderTree').start()
  createXhrMonitor('renderTree').start()
}

const InterfaceBlock: React.FunctionComponent<{ data: TitleNode }> = (
  props: Props,
) => {
  startMonitor()
  const [show, setShowState] = useState(false)
  function changeBtnState(): void {
    setShowState(!show)
  }
  const { data } = props
  const addData: AddData = { key: data.key, pid: data.pid + 1 }
  const delData = {key: data.key,type: data.type}
  return (
    <div
      className='InterfaceBlock'
      onMouseEnter={changeBtnState}
      onMouseLeave={changeBtnState}
    >
      <div>
        <MethodList value={data.type} />
      </div>
      <div className='InterfaceBlock-title'>{data.title}</div>
      {show && (
        <div className='btn'>
          {data.type === 'FILE' && <div><Menu data={addData}/><AddBtn data={addData} /></div>}
          <DelBtn data={delData} />
        </div>
      )}
    </div>
  )
}

export default InterfaceBlock
