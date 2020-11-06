// 嵌套的demo
import React, { memo } from 'react'
import { SourceBox } from './nesting/SourceBox'
import TargetBox from './nesting/TargetBox'
import { Colors } from './nesting/Colors'

export const NestContainer = memo(function Container() {
  return (
    <>
      <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
        <div style={{ float: 'left' }}>
          <SourceBox color={Colors.BLUE}>
            <SourceBox color={Colors.YELLOW}>
              <SourceBox color={Colors.YELLOW} />
              <SourceBox color={Colors.BLUE} />
            </SourceBox>
            <SourceBox color={Colors.BLUE}>
              <SourceBox color={Colors.YELLOW} />
            </SourceBox>
          </SourceBox>
        </div>
        <div style={{ float: 'right', marginLeft: '5rem', marginTop: '.5rem' }}>
          <TargetBox></TargetBox>
        </div>
      </div>
    </>
  )
})
