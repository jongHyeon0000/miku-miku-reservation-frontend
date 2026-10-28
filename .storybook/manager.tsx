import React from 'react'
import { addons } from 'storybook/manager-api'

/** 목록 이름이 `이름 [파일이름]` 모양이면 이름과 [파일이름]을 두 줄로 나눠 보여 준다 */
const NAME_WITH_FILE = /^(.+?) (\[.+\])$/

addons.setConfig({
  sidebar: {
    renderLabel: (item) => {
      const matched = NAME_WITH_FILE.exec(item.name)

      if (matched === null) {
        return item.name
      }

      const koreanName = matched[1]
      const fileName = matched[2]

      return (
        <span>
          {koreanName}
          <br />
          {fileName}
        </span>
      )
    },
  },
})
