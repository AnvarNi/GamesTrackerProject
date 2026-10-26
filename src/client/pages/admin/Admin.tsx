import { api } from '@client/api/axios'
import { useDebounce } from '@client/hooks/useDebounce'
import { useGenres } from '@client/hooks/useGenres'
import { platformEnum } from '@server/db/schema'
import type { TGame } from '@shared/types/game.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { is } from 'drizzle-orm'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type GameForm = Pick<TGame, 'myScore' | 'review' | 'genreId' | 'platform'> & {
  completedAt: string
}

export function Admin() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<any>(null)

  const debouncedSearch = useDebounce(search)

  const { data: results = [] } = useQuery({
    queryKey: ['rawg-search', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return []
      const { data } = await api.get('/rawg/search', {
        params: { q: debouncedSearch }
      })
      return data.results || []
    },
    enabled: !!debouncedSearch
  })

  const handleSelect = (game: any) => {
    setSelected(game)
    setSearch('')
  }

  const { data: genres = [] } = useGenres()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => api.post('/games', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] })
      setSelected(null)
      reset()
      toast.success('Игра успешно добавлена!')
    }
  })

  const { register, handleSubmit, reset } = useForm<GameForm>({
    defaultValues: {
      platform: 'PC'
    }
  })

  const onSubmit = (data: GameForm) => {
    if (!selected) return

    mutate({
      externalId: String(selected.id),
      title: selected.name,
      slug: selected.slug,
      posterUrl: selected.background_image,
      metaScore: selected.metacritic,
      myScore: Number(data.myScore),
      review: data.review,
      platform: data.platform,
      genreId: data.genreId,
      completedAt: new Date(data.completedAt).toISOString()
    })
  }

  return (
    <div>
      <div className='max-w-2xl mx-auto mt-10 space-y-5'>
        <h1 className='text-3xl font-serif text-accent'>Добавить игру</h1>
        <div className='relative'>
          <input
            type='text'
            placeholder='Поиск игры в RAWG...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='w-full px-4 py-2 bg-dark/70 border border-white/10 rounded-lg text-white placeholder:text-white/50 
            focus:outline-none focus-border-accent/50 font-serif'
          />
          {results.length > 0 && (
            <ul className='absolute z-20 w-full bg-dark border border-white/10 rounded-lg mt-1 max-h-60 overflow-auto'>
              {results.map((g: any) => (
                <li
                  key={g.id}
                  onClick={() => handleSelect(g)}
                  className='px-4 py-2 hover:bg-accent/20 cursor-pointer flex items-center gap-3'
                >
                  {g.background_image && (
                    <img
                      src={g.background_image}
                      className='w-10 h-10 object-cover rounded'
                    />
                  )}
                  <span>{g.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {selected && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 bg-dark/50 p-4 rounded-lg border border-white/10'
        >
          <div className='flex gap-4'>
            {selected.background_image && (
              <img
                src={selected.background_image}
                className='w-32 h-140 object-cover rounded'
              />
            )}
            <div>
              <h2 className='text-xl font-serif text-accent'>
                {selected.name}
              </h2>
              <p className='text-gray text-sm'>
                Metacritic: {selected.metacritic ?? '—'}
              </p>
            </div>
          </div>

          <select
            {...register('genreId', { required: true })}
            className='w-full px-4 py-2 bg-dark/70 border border-white/10 rounded-lg text-white font-serif'
          >
            <option value=''>Выберите жанр</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <input
            type='number'
            placeholder='Твоя оценка (1-10)'
            {...register('myScore', { required: true, min: 1, max: 10 })}
            className='w-full px-4 py-2 bg-dark/70 border border-white/10 rounded-lg text-white placeholder:text-gray font-serif'
          />

          <input
            type='date'
            placeholder='Дата завершения'
            {...register('completedAt', { required: true })}
            className='w-full px-4 py-2 bg-dark/70 border border-white/10 rounded-lg text-white placeholder:text-gray font-serif'
          />

          <textarea
            placeholder='Твой отзыв'
            {...register('review')}
            rows={4}
            className='w-full px-4 py-2 bg-dark/70 border border-white/10 rounded-lg text-white placeholder:text-gray font-serif resize-none'
          />

          <button disabled={isPending}
            className='w-full px-4 py-2 bg-accent text-dark font-serif rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50'>
            {isPending ? 'Добавление...' : 'Добавить'}
          </button>
        </form>
      )}
    </div>
  )
}
