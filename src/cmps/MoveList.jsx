import React from 'react'

export function MoveList({ moves }) {
  return (
    <section className='moves-preview flex'>
      {moves.slice(0, 3).map((move) => (
        <article key={move._id} className="user-moves-list flex">
          <div>At: {new Date(move.date).toLocaleDateString()}</div>
          {(move.amount > 1 && (
            <span>You transferred {move.amount} Coins</span>
          )) ||
            ((move.amount = 1) && <span>Transferred {move.amount} Coin</span>)}
          <div>To: {move.toUser.name}</div>
        </article>
      ))}
    </section>
  )
}
