import React from 'react'
import { useState, useEffect } from 'react'
import { Tree } from 'antd'
import { arrayToTree } from '@/utils/arrayToTree'
import type { TreeNode, ArrayItem, ArrayNode } from '@/types/arrayToTree'
import './index.less'
import { assign } from '@/store/modules/dirArraySlice.ts'
import { RootState } from '@/store/index.ts'
import { useSelector, useDispatch } from 'react-redux'
// 导入监控
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor'
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor'
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor'
import { createXhrMonitor } from '../../../sdk/createXhrMonitor'
import InterfaceBlock from '../InterfaceBlock'
import {FlatItem} from "@/types/mergeFlatArrays";
import {mergeFlatArrays} from "@/utils/mergeFlatArrays";
import request from "@/api/request";
import {increment} from "@/store/modules/watchDir";

interface Props {
  data: ArrayItem[]
}

interface MakeValue {
  value: ArrayItem[]
}

const renderTree: React.FC = () => {
  function startMonitor() {
    createJsErrorMonitor('renderTree').start()
    createResourceErrorMonitor('renderTree').start()
    createPromiseErrorMonitor('renderTree').start()
    createXhrMonitor('renderTree').start()
  }
  const a1: FlatItem[] = [
    {
      id: "694948f6-7908-4388-8da7-c744b13f76b6",
      project_id: 1063,
      name: "根目录",
      parent_id: null
    }
  ]
  const a2: FlatItem[] = [
    {
      id: "3b658414-ff28-4b2a-b7ff-627656205961",
      folder_id: "694948f6-7908-4388-8da7-c744b13f76b6",
      create_user: "5a0ce9c2-01a6-4b4f-9d79-adfc4b1a4213",
      create_time: "2023-08-14 17:25:40",
      operate_time: "2023-08-14 17:25:40",
      operate_user: "5a0ce9c2-01a6-4b4f-9d79-adfc4b1a4213",
      request_data: "cs",
      response_data: "cccc",
      project_id: 1063,
      description: "cxxxx",
      name: "getList"
    }
  ]
  const [data,setData] = useState(mergeFlatArrays(a1,[],1063))
  const [makeValue, setMakeValue] = useState<MakeValue>({ value: data })
  function reqFun () {
    // request.post("v1/project/query",{ projectid: 1063 },{}).then((resp)=>{
    //   // const temp = mergeFlatArrays(resp.data.data.folder_list,resp.data.data.api_list,1063)
    //   // console.log(temp)
    //   // setData(temp)
    //   console.log(resp)
    // })
    fetch("http://47.112.108.202:7002/api/v1/project/query", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') as string
      },
      body: JSON.stringify({ projectid: 1063 })
    })
        .then(response => response.json())
        .then(res => {
          // 在这里处理返回的数据
          console.log(res);
          setData(mergeFlatArrays(res.data.folder_list,res.data.api_list,1063))
          setMakeValue({value:mergeFlatArrays(res.data.folder_list,res.data.api_list,1063)})
        })
        .catch(error => {
          // 在这里处理错误
          console.error(error);
        });
  }
  const watchDir = useSelector((state: RootState) => state.watchDir.value)
  useEffect(()=>{
    console.log(1)
    reqFun();
  },[watchDir])
  function restoreData(d: ArrayItem[]): ArrayNode[] {
    const restoredData: ArrayNode[] = []

    for (const item of d) {
      const restoredItem: ArrayNode = {
        key: item.key,
        title: <InterfaceBlock data={item.title as any} />, // 将之前提取出的数据重新放入组件中
        type: item.type,
        pid: item.pid,
      }

      restoredData.push(restoredItem)
    }

    return restoredData
  }

  console.log(makeValue.value)
  const dispatch = useDispatch()
  const onDrop = (info) => {
    console.log(info)
    console.log(info.dragNodesKeys[0])
    const url = info.dragNode.type === "FILE" ? "/v1/folder/update" : "/v1/apis/update"
    const urlData = info.dragNode.type === "FILE" ? { folder_id: info.dragNodesKeys[0],parent_id: info.node.key} : { apis_id: info.dragNodesKeys[0],folder_id: info.node.key}
    fetch(`http://47.112.108.202:7002/api${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') as string
      },
      body: JSON.stringify(urlData)
    })
        .then(response => response.json())
        .then(res => {
          // 在这里处理返回的数据
          dispatch(increment())
        })
        .catch(error => {
          // 在这里处理错误
          console.error(error);
        });
  }
  const renderData = restoreData(makeValue.value)
  // 数组转树形结构
  const tree: TreeNode[] = arrayToTree(renderData)

  const { DirectoryTree } = Tree
  startMonitor()
  return (
    <Tree
      treeData={tree}
      defaultExpandAll
      draggable
      blockNode
      onDrop={onDrop}
      style={{ width: '270px' }}
      className='renderTree'
    ></Tree>
  )
}

export default renderTree
