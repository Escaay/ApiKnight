import React, { useEffect } from 'react'
import { Card, Image } from 'antd'
import { useNavigate } from 'react-router-dom'

const ProjectItem = (params: ProjectItemType) => {
  useEffect(() => {}, [])
  const navigate = useNavigate()
  const toProject = () => {
    console.log('toProject');
    navigate('/project/apiMgt', { state: { project_id: params.project_id } })
  }
  return (
    <div onClick={toProject}>
      <Card title={params.name} style={{ width: 300 }}>
        <Image
          width={200}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          preview={false}
          alt='项目图片'
        />
        <div>{params.dec}</div>
      </Card>
    </div>
  )
}
export default ProjectItem
