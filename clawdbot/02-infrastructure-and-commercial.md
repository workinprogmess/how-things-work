# clawdbot - infrastructure & commercial questions

---

## q2: what's a vps?

**vps = virtual private server**

think of it as renting a slice of a powerful computer in a data center.

- it's "virtual" because one physical machine is split into many isolated virtual ones
- you get your own operating system, storage, cpu, ram
- it runs 24/7 (unlike your laptop)
- you control it remotely

**analogy:** like having your own apartment in a big building. you share the building (physical hardware), but your apartment (vps) is private and yours to control.

**popular vps providers:** digitalocean, linode, hetzner, aws lightsail (~$5-20/month for basic)

---

## q3: what's tailscale?

**tailscale = easy vpn that connects your devices**

traditional vpn: all traffic goes through one central server (complicated setup)
tailscale: devices connect directly to each other (peer-to-peer mesh)

**why it matters for clawdbot:**
- your phone can securely reach your home server/vps from anywhere
- no need to open ports or configure firewalls
- encrypted end-to-end
- works across different networks automatically

**setup:** install on each device, sign in, done. they can now "see" each other as if on same local network.

**cost:** free for up to 3 users, 100 devices

---

## q4: can clawdbot only be used by me/for myself?

**yes, by design.** it's architected as a *personal* assistant for a single user.

- the tagline is literally "your own personal AI assistant"
- designed for one person's data, one person's integrations
- group chat support exists but with sandboxed/restricted access (safety feature)

it's *not* built as a multi-tenant saas where many users share one deployment.

---

## q5: how can i leverage clawdbot to build/sell my own multi-user agent?

### the good news
- **license: MIT** → you can fork, modify, sell commercially
- open architecture you can study and adapt

### the challenge
clawdbot is single-user by design. to make it multi-user, you'd need to:

1. **add multi-tenancy layer**
   - user accounts, authentication
   - isolated data stores per user
   - separate credentials/integrations per user

2. **change the deployment model**
   - single gateway → many gateways (one per user), or
   - shared gateway with strict isolation

3. **handle billing/subscriptions** (if selling)

4. **scale infrastructure**
   - one user = one set of resources
   - many users = need orchestration (kubernetes, etc.)

### your options

| approach | effort | outcome |
|----------|--------|---------|
| **fork & rebuild** | high | full control, but you're maintaining everything |
| **use as reference** | medium | study architecture, build your own from scratch |
| **offer hosted clawdbot** | medium | run individual instances for clients (managed service model) |
| **build on top** | varies | create plugins/skills that work with clawdbot |

### key question to answer first
what's your agent going to *do* that clawdbot doesn't? the architecture matters less than the value proposition.

---

sources:
- [clawdbot github](https://github.com/clawdbot/clawdbot) - mit license confirmed
- [aws - what is vps](https://aws.amazon.com/what-is/vps/)
- [tailscale - what is tailscale](https://tailscale.com/kb/1151/what-is-tailscale)
- [tailscale - how it works](https://tailscale.com/blog/how-tailscale-works)
