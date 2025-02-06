import Intro from '@/components/dashboard/MyPage/Intro'
import ProfileSection from '@/components/dashboard/MyPage/ProfileSection'
import Top from '@/components/dashboard/Top'

function CreatorProfilePage() {
  return (
    <div>
        <div>
            <Top title="Creator Profile" />
        </div>
        <div>
          <ProfileSection />
          <div>
            <Intro />
          </div>
        </div>
    </div>
  )
}

export default CreatorProfilePage