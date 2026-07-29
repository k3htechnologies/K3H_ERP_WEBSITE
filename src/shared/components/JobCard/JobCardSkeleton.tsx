import Reveal from '@/shared/components/Reveal/Reveal';

interface Props {
  index: number;
}

const JobCardSkeleton = ({ index }: Props) => {
  return (
    <Reveal>
      <article
        className={`relative flex h-full min-h-95 animate-pulse flex-col overflow-hidden border p-7 ${
          index % 2 === 0
            ? 'rounded-tr-3xl rounded-bl-3xl'
            : 'rounded-tl-3xl rounded-br-3xl'
        }`}
        style={{
          border: '1px solid',
          borderImageSource:
            'linear-gradient(106.34deg, rgba(255,255,255,.45) 2.28%, rgba(255,255,255,0) 51.14%, rgba(255,255,255,.75) 100%)',
          background:
            'linear-gradient(110.09deg, rgba(255,255,255,.35) -9.1%, rgba(255,255,255,0) 51.58%, rgba(255,255,255,.1225) 112.26%)',
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between">
            <div className="h-9 w-52 rounded bg-white/10" />
            <div className="h-7 w-20 rounded-full bg-white/10" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-white/10" />
                <div className="h-4 w-28 rounded bg-white/10" />
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-11/12 rounded bg-white/10" />
            <div className="h-4 w-3/4 rounded bg-white/10" />
          </div>

          <div className="mt-auto">
            <div className="my-8 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-5 w-24 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default JobCardSkeleton;
