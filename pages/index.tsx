import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'

interface Person {
  name: string
  amount: number
}

export default function Home() {
  const [memberCount, setMemberCount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [maxAmount, setMaxAmount] = useState<number>(0)
  const [minAmount, setMinAmount] = useState<number>(0)
  const [names, setNames] = useState<string[]>([])
  const [results, setResults] = useState<Person[]>([])
  const [error, setError] = useState<string>('')
  const [isCounting, setIsCounting] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(5)

  const handleMemberCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseNumber(e.target.value)
    setMemberCount(count)
    setNames(new Array(count).fill(''))
    setResults([])
    setError('')
  }

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names]
    newNames[index] = value
    setNames(newNames)
  }

  const validateInputs = (): boolean => {
    if (memberCount <= 0) {
      setError('인원수는 1명 이상이어야 합니다.')
      return false
    }
    if (totalAmount <= 0) {
      setError('결제금액은 0보다 커야 합니다.')
      return false
    }
    
    // 기본값 적용: 최소금액이 입력되지 않으면 0, 최대금액이 입력되지 않으면 결제금액
    const actualMinAmount = minAmount || 0
    const actualMaxAmount = maxAmount || totalAmount
    
    if (actualMinAmount < 0) {
      setError('최소금액은 0 이상이어야 합니다.')
      return false
    }
    if (actualMaxAmount < 0) {
      setError('최대금액은 0 이상이어야 합니다.')
      return false
    }
    if (actualMinAmount > actualMaxAmount) {
      setError('최소금액은 최대금액보다 작거나 같아야 합니다.')
      return false
    }
    if (actualMinAmount * memberCount > totalAmount) {
      setError('최소금액 × 인원수가 결제금액보다 클 수 없습니다.')
      return false
    }
    if (actualMaxAmount * memberCount < totalAmount) {
      setError('최대금액 × 인원수가 결제금액보다 작을 수 없습니다.')
      return false
    }
    if (names.some(name => name.trim() === '')) {
      setError('모든 인원의 이름을 입력해주세요.')
      return false
    }
    return true
  }

  const distributeAmounts = useCallback((): Person[] => {
    // 기본값 적용: 최소금액이 입력되지 않으면 0, 최대금액이 입력되지 않으면 결제금액
    const actualMinAmount = minAmount || 0
    const actualMaxAmount = maxAmount || totalAmount
    
    const amounts: number[] = new Array(memberCount).fill(actualMinAmount)
    let remaining = totalAmount - (actualMinAmount * memberCount)

    // 각 인원이 받을 수 있는 최대 추가 금액
    const maxAdditional = actualMaxAmount - actualMinAmount

    // 남은 금액을 랜덤하게 배분
    const shuffledIndices = Array.from({ length: memberCount }, (_, i) => i)
    // Fisher-Yates 셔플
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]]
    }

    // 랜덤 순서로 배분
    for (const idx of shuffledIndices) {
      if (remaining <= 0) break

      // 이 인원이 받을 수 있는 최대 추가 금액
      const canReceive = Math.min(maxAdditional, remaining)
      
      // 다른 인원들이 최소금액을 받을 수 있도록 남겨둘 금액 계산
      const othersMinNeeded = (memberCount - 1) * actualMinAmount
      const othersCurrentTotal = amounts.reduce((sum, amt, i) => 
        i !== idx ? sum + amt : sum, 0
      )
      const othersNeedMore = Math.max(0, othersMinNeeded - othersCurrentTotal)
      
      // 이 인원이 받을 수 있는 실제 최대 금액
      const actualMax = Math.min(canReceive, remaining - othersNeedMore)
      
      if (actualMax > 0) {
        const additional = Math.floor(Math.random() * (actualMax + 1))
        amounts[idx] += additional
        remaining -= additional
      }
    }

    // 남은 금액을 랜덤하게 배분 (1원 단위)
    while (remaining > 0) {
      const availableIndices = amounts
        .map((amt, idx) => ({ amt, idx }))
        .filter(({ amt }) => amt < actualMaxAmount)
        .map(({ idx }) => idx)
      
      if (availableIndices.length === 0) break
      
      const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)]
      amounts[randomIdx] += 1
      remaining -= 1
    }

    // 결과 생성
    const result: Person[] = names.map((name, index) => ({
      name,
      amount: amounts[index]
    }))

    return result
  }, [memberCount, totalAmount, minAmount, maxAmount, names])

  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isCounting && countdown === 0) {
      const distributed = distributeAmounts()
      setResults(distributed)
      setIsCounting(false)
      setCountdown(5)
    }
  }, [isCounting, countdown, distributeAmounts])

  const handleDistribute = () => {
    setError('')
    if (!validateInputs()) {
      return
    }

    setResults([])
    setIsCounting(true)
    setCountdown(5)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원'
  }

  const formatNumber = (value: number): string => {
    if (value === 0) return ''
    return new Intl.NumberFormat('ko-KR').format(value)
  }

  const parseNumber = (value: string): number => {
    const cleaned = value.replace(/,/g, '')
    return parseInt(cleaned) || 0
  }

  return (
    <>
      <Head>
        <title>랜덤 결제 배분</title>
        <meta name="description" content="결제 금액을 랜덤하게 배분하는 웹사이트" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>랜덤 결제 배분</h1>
          
          <div className={styles.inputSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="memberCount">인원수</label>
              <input
                id="memberCount"
                type="text"
                inputMode="numeric"
                value={formatNumber(memberCount)}
                onChange={handleMemberCountChange}
                placeholder="인원수를 입력하세요"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="totalAmount">결제금액 (원)</label>
              <input
                id="totalAmount"
                type="text"
                inputMode="numeric"
                value={formatNumber(totalAmount)}
                onChange={(e) => {
                  setTotalAmount(parseNumber(e.target.value))
                  setError('')
                }}
                placeholder="결제금액을 입력하세요"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="minAmount">최소금액 (원) <span className={styles.optional}>(선택, 기본값: 0)</span></label>
              <input
                id="minAmount"
                type="text"
                inputMode="numeric"
                value={formatNumber(minAmount)}
                onChange={(e) => {
                  const value = e.target.value
                  setMinAmount(value === '' ? 0 : parseNumber(value))
                  setError('')
                }}
                placeholder="입력하지 않으면 0원"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="maxAmount">최대금액 (원) <span className={styles.optional}>(선택, 기본값: 결제금액)</span></label>
              <input
                id="maxAmount"
                type="text"
                inputMode="numeric"
                value={formatNumber(maxAmount)}
                onChange={(e) => {
                  const value = e.target.value
                  setMaxAmount(value === '' ? 0 : parseNumber(value))
                  setError('')
                }}
                placeholder="입력하지 않으면 결제금액"
              />
            </div>
          </div>

          {memberCount > 0 && (
            <div className={styles.namesSection}>
              <h2 className={styles.sectionTitle}>이름 입력</h2>
              <div className={styles.namesGrid}>
                {names.map((name, index) => (
                  <div key={index} className={styles.nameInputGroup}>
                    <label htmlFor={`name-${index}`}>{index + 1}번째 인원</label>
                    <input
                      id={`name-${index}`}
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={styles.distributeButton}
            onClick={handleDistribute}
            disabled={memberCount === 0 || isCounting}
          >
            배분하기
          </button>

          {isCounting && (
            <div className={styles.countdownSection}>
              <div className={styles.countdownNumber}>{countdown}</div>
            </div>
          )}

          {results.length > 0 && !isCounting && (
            <div className={styles.resultsSection}>
              <h2 className={styles.sectionTitle}>배분 결과</h2>
              <div className={styles.resultsList}>
                {results.map((person, index) => (
                  <div key={index} className={styles.resultItem}>
                    <span className={styles.personName}>{person.name}</span>
                    <span className={styles.personAmount}>
                      {formatCurrency(person.amount)}
                    </span>
                  </div>
                ))}
                <div className={styles.totalResult}>
                  <span>총합</span>
                  <span>{formatCurrency(results.reduce((sum, p) => sum + p.amount, 0))}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

