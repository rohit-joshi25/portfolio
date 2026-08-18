export type Level = "basic" | "intermediate" | "advanced";
export type Kind = "conceptual" | "coding";

export type InterviewQuestion = {
  id: string;
  category: string;
  level: Level;
  kind: Kind;
  q: string;
  a: string;
  code?: string;
};

export const interviewCategories = [
  "Laravel Core",
  "Routing & Middleware",
  "Eloquent & Database",
  "Validation & Requests",
  "Auth & Security",
  "APIs",
  "Queues, Events & Jobs",
  "Caching & Performance",
  "Architecture",
  "Coding Problems",
] as const;

export const laravelInterviewQuestions: InterviewQuestion[] = [
  // ─── Laravel Core ─────────────────────────────────────────
  {
    id: "c1",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "What is Laravel and why do teams use it?",
    a: "Laravel is a PHP framework that follows MVC. Teams use it because routing, Eloquent ORM, migrations, queues, auth, and artisan tooling are built in — so you ship features faster with consistent structure. For 1 year exp, say: you use it to build REST APIs and admin panels with less boilerplate and better security defaults (CSRF, hashing, prepared statements via Eloquent).",
  },
  {
    id: "c2",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "Explain the Laravel request lifecycle.",
    a: "1) public/index.php boots the app. 2) HTTP kernel loads. 3) Service providers register then boot. 4) Request passes through global + route middleware. 5) Router matches a controller/closure. 6) Controller uses services/models and returns a response. 7) Response middleware runs, then output is sent. Interview tip: mention Kernel.php and service providers — that shows you know where the app is wired.",
  },
  {
    id: "c3",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "What is Artisan? Name commands you use daily.",
    a: "Artisan is Laravel’s CLI. Daily ones: php artisan serve, make:controller, make:model -m, make:migration, migrate, db:seed, route:list, tinker, queue:work, config:clear, cache:clear, optimize:clear. Never run config:cache in local if .env keeps changing — cached config ignores new env keys until you clear it.",
  },
  {
    id: "c4",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "What are service providers?",
    a: "Service providers are the bootstrapping classes of Laravel. register() binds things into the container (no other services assumed ready). boot() runs after all providers are registered — use it for routes, views, event listeners, gates. config/app.php (or bootstrap/providers.php in Laravel 11+) lists them.",
  },
  {
    id: "c5",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "What is the Service Container / IoC?",
    a: "The container resolves class dependencies automatically. If a controller constructor type-hints OrderService, Laravel instantiates it and injects nested dependencies too. You bind interfaces to implementations in a provider: $this->app->bind(PaymentGateway::class, StripeGateway::class). This is how you swap implementations and write testable code.",
    code: `public function __construct(private OrderService $orders) {}

// In AppServiceProvider::register()
$this->app->bind(PaymentGateway::class, StripeGateway::class);`,
  },
  {
    id: "c6",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "Facade vs helper vs injected class — when to use which?",
    a: "Facades (Cache::get) are static-looking proxies to container bindings — fine in controllers. Helpers (cache(), now()) are shortcuts. Constructor injection is best for services you want to mock in tests. In interviews, say: you prefer injection for business services, facades for thin controller code.",
  },
  {
    id: "c7",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "What is Composer PSR-4 autoloading?",
    a: "composer.json maps namespaces to folders, e.g. App\\ → app/. When you use App\\Models\\User, Composer loads app/Models/User.php without require. After adding a new class in a non-standard path, run composer dump-autoload. Laravel packages follow the same convention.",
  },
  {
    id: "c8",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: ".env vs config files — which should code read?",
    a: "Application code should call config('app.name'), never env('APP_NAME') outside config files. Reason: php artisan config:cache dumps config to a file and env() then returns null in many places. Put env() only inside config/*.php.",
    code: `// config/services.php
'stripe_key' => env('STRIPE_KEY'),

// anywhere else
config('services.stripe_key');`,
  },
  {
    id: "c9",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "register() vs boot() — what breaks if you mix them up?",
    a: "If you use another service (Gate, Event, config of another provider) inside register(), it may not be ready yet. Bindings and singletons go in register(). Event::listen, Gate::define, View::composer, publishing config — boot(). A classic bug: calling env() or another provider’s facade too early in register().",
  },
  {
    id: "c10",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "What does php artisan optimize:clear do, and when do you use it?",
    a: "It clears config, route, view, and application cache. Use it when production/staging behaves like old config, routes 404 after deploy, or Blade looks stale. Do not confuse with config:cache which *creates* cache for production speed.",
  },

  // ─── Routing & Middleware ─────────────────────────────────
  {
    id: "r1",
    category: "Routing & Middleware",
    level: "basic",
    kind: "conceptual",
    q: "web.php vs api.php — what is the difference?",
    a: "web routes use session, CSRF, cookies (StartSession, VerifyCsrfToken). api routes are stateless, prefixed with /api, throttled, typically Sanctum/JWT token auth. Don’t put CSRF-protected form posts on api.php unless you know why.",
  },
  {
    id: "r2",
    category: "Routing & Middleware",
    level: "basic",
    kind: "conceptual",
    q: "What is middleware? Give 3 real examples.",
    a: "Middleware filters HTTP requests. Examples: auth (must be logged in), throttle (rate limit), role:admin (custom), cors, encrypt cookies. Global middleware runs on every request; route middleware only on assigned routes.",
  },
  {
    id: "r3",
    category: "Routing & Middleware",
    level: "basic",
    kind: "coding",
    q: "Write a route group for admin with prefix, name, and middleware.",
    a: "Group shared prefix, names, and auth+role middleware so you don’t repeat them.",
    code: `Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/students', [StudentController::class, 'index'])->name('students.index');
        Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    });`,
  },
  {
    id: "r4",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "coding",
    q: "Write middleware that allows only school_id in JWT/session to access a resource.",
    a: "Abort 403 if the authenticated user’s school does not match the route school. Typical in multi-tenant apps like OEMS.",
    code: `public function handle(Request $request, Closure $next)
{
    $user = $request->user();
    $schoolId = $request->route('school')?->id ?? $request->input('school_id');

    if (!$user || (int) $user->school_id !== (int) $schoolId) {
        abort(403, 'Unauthorized for this school.');
    }

    return $next($request);
}`,
  },
  {
    id: "r5",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "conceptual",
    q: "Implicit vs explicit route model binding?",
    a: "Implicit: Route::get('/users/{user}', ...) type-hint User $user — Laravel fetches by id (or getRouteKeyName()). Explicit: Route::model('user', User::class) or Route::bind('user', fn ($v) => User::where('uuid', $v)->firstOrFail()). Use uuid/slug as route key to avoid exposing sequential ids.",
    code: `public function getRouteKeyName(): string
{
    return 'uuid';
}`,
  },
  {
    id: "r6",
    category: "Routing & Middleware",
    level: "advanced",
    kind: "conceptual",
    q: "How does middleware parameter passing work (e.g. role:admin)?",
    a: "You register alias 'role' => EnsureRole::class. Route: middleware('role:admin,editor'). handle(Request $request, Closure $next, ...$roles). Extra segments after : are passed as parameters. Multiple values are comma-separated.",
  },
  {
    id: "r7",
    category: "Routing & Middleware",
    level: "basic",
    kind: "coding",
    q: "Write a resource route and list the 7 methods it creates.",
    a: "Route::resource('posts', PostController::class) creates index, create, store, show, edit, update, destroy. For APIs use apiResource (no create/edit views).",
    code: `Route::resource('posts', PostController::class);
Route::apiResource('posts', PostController::class);

// php artisan route:list --name=posts`,
  },
  {
    id: "r8",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "conceptual",
    q: "What is CSRF and how does Laravel protect forms?",
    a: "CSRF tricks a logged-in browser into submitting a state-changing request. Laravel’s VerifyCsrfToken middleware checks a token from the session vs _token field or X-CSRF-TOKEN header. Blade: @csrf. APIs using tokens (Sanctum SPA with cookies still needs CSRF; pure Bearer token APIs typically don’t use web CSRF).",
  },

  // ─── Eloquent & Database ──────────────────────────────────
  {
    id: "e1",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "Eloquent vs Query Builder vs raw SQL — when?",
    a: "Eloquent: models, relationships, events, readable CRUD. Query Builder (DB::table): slightly faster, no model overhead, good for reports. Raw SQL: complex analytics, but bind parameters always. Default to Eloquent; drop to query builder for heavy aggregations.",
  },
  {
    id: "e2",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "$fillable vs $guarded vs $hidden.",
    a: "$fillable = mass-assignable fields (whitelist). $guarded = blacklist (empty array [] means all fillable — dangerous). Never leave $guarded = [] on production models with request()->all(). $hidden hides attributes in JSON (password, remember_token). $casts converts types (datetime, array, boolean, encrypted).",
  },
  {
    id: "e3",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "Explain hasOne, hasMany, belongsTo, belongsToMany.",
    a: "User hasOne Profile (profile.user_id). User hasMany Post. Post belongsTo User. User belongsToMany Role via role_user pivot. Inverse of hasMany is belongsTo. Many-to-many needs a pivot table named alphabetically by convention (role_user).",
  },
  {
    id: "e4",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "What is the N+1 problem and how do you fix it?",
    a: "Looping posts and accessing $post->user runs 1 query + N user queries. Fix with eager loading: Post::with('user')->get(). Nested: with('user.profile', 'comments.author'). Use withCount('comments'). Detect with Laravel Debugbar, Telescope, or ->toSql() / listen to DB::listen. Prevent lazy load in local: Model::preventLazyLoading().",
    code: `// Bad
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->user->name;
}

// Good
$posts = Post::with('user')->get();`,
  },
  {
    id: "e5",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Write relationships: School has many Students; Student belongs to School and many Exams (pivot exam_student with score).",
    a: "Define both sides and the pivot extra column.",
    code: `// School.php
public function students()
{
    return $this->hasMany(Student::class);
}

// Student.php
public function school()
{
    return $this->belongsTo(School::class);
}

public function exams()
{
    return $this->belongsToMany(Exam::class)
        ->withPivot('score')
        ->withTimestamps();
}`,
  },
  {
    id: "e6",
    category: "Eloquent & Database",
    level: "basic",
    kind: "coding",
    q: "Write a migration to create students with unique email per school.",
    a: "Composite unique index (school_id, email) is the correct constraint.",
    code: `Schema::create('students', function (Blueprint $table) {
    $table->id();
    $table->foreignId('school_id')->constrained()->cascadeOnDelete();
    $table->string('name');
    $table->string('email');
    $table->string('password');
    $table->timestamps();

    $table->unique(['school_id', 'email']);
});`,
  },
  {
    id: "e7",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Fetch students who have at least one exam score > 80.",
    a: "Use whereHas on the relationship with pivot constraint.",
    code: `Student::whereHas('exams', function ($q) {
    $q->where('exam_student.score', '>', 80);
})->get();`,
  },
  {
    id: "e8",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "Soft deletes — how do they work? How do you include deleted rows?",
    a: "Use SoftDeletes trait + deleted_at column. Eloquent hides those rows by default. withTrashed(), onlyTrashed(), restore(), forceDelete(). Unique indexes still see soft-deleted rows — a common production bug when re-creating the same email.",
    code: `User::withTrashed()->find($id);
User::onlyTrashed()->restore();`,
  },
  {
    id: "e9",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "Polymorphic relations — when and an example.",
    a: "When many models share a related type: comments on posts and videos. commentable_id + commentable_type. morphTo / morphMany. Don’t overuse — they are harder to index and constrain with FKs. Good for activity logs, attachments, comments.",
    code: `// Comment.php
public function commentable()
{
    return $this->morphTo();
}

// Post.php
public function comments()
{
    return $this->morphMany(Comment::class, 'commentable');
}`,
  },
  {
    id: "e10",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "Accessors, mutators, and casts (Laravel 9+ style).",
    a: "Attribute::make(get:, set:) formats values when reading/writing. Casts handle json, datetime, hashed, encrypted, decimal. Prefer casts for passwords (hashed) instead of a custom mutator.",
    code: `protected function name(): Attribute
{
    return Attribute::make(
        get: fn (string $value) => ucfirst($value),
        set: fn (string $value) => strtolower($value),
    );
}

protected $casts = [
    'email_verified_at' => 'datetime',
    'settings' => 'array',
    'password' => 'hashed',
];`,
  },
  {
    id: "e11",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Write a local scope: Student::active()->ofGrade('10-A').",
    a: "Local scopes are query builder macros on the model.",
    code: `public function scopeActive(Builder $query): void
{
    $query->where('is_active', true);
}

public function scopeOfGrade(Builder $query, string $grade): void
{
    $query->where('grade', $grade);
}

// Student::active()->ofGrade('10-A')->get();`,
  },
  {
    id: "e12",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "chunk() vs cursor() vs lazy() for 1 lakh rows.",
    a: "chunk(1000, callback) runs repeated LIMIT/OFFSET (offset gets slow on huge tables). lazy() / lazyById() is chunked internally, better. cursor() uses a PDO cursor, one model at a time, lowest memory but keeps one connection open. For updates, chunkById() is safest so pagination doesn’t skip rows.",
    code: `User::query()->orderBy('id')->chunkById(500, function ($users) {
    foreach ($users as $user) {
        // process
    }
});`,
  },
  {
    id: "e13",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Wrap money transfer in a DB transaction. Why?",
    a: "If the second update fails, the first must roll back so balances stay consistent.",
    code: `DB::transaction(function () use ($from, $to, $amount) {
    $from->decrement('balance', $amount);
    $to->increment('balance', $amount);
});

// or
DB::beginTransaction();
try {
    // ...
    DB::commit();
} catch (\\Throwable $e) {
    DB::rollBack();
    throw $e;
}`,
  },
  {
    id: "e14",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "How do you stop SQL injection in Laravel?",
    a: "Use Eloquent/Query Builder bindings: where('email', $email) never interpolates. Avoid DB::raw(\"where name = '$name'\"). If you need raw: whereRaw('price > ?', [$min]). Also validate input, use mass-assignment protection, and parameterized PDO. Blade {{ }} escapes XSS (HTML), not a substitute for SQL bindings.",
    code: `// Safe
User::where('email', $email)->first();
DB::select('select * from users where email = ?', [$email]);

// Unsafe
DB::select(\"select * from users where email = '$email'\");`,
  },
  {
    id: "e15",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "first() vs firstOrFail() vs findOrFail() vs updateOrCreate().",
    a: "first() returns null. firstOrFail()/findOrFail() throw ModelNotFoundException → 404. updateOrCreate(['email' => $e], ['name' => $n]) finds by first array, updates/creates with second. firstOrCreate similar but doesn’t update existing extra fields. Useful for idempotent imports.",
  },
  {
    id: "e16",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "When do you add a database index? What is a covering/composite index?",
    a: "Index columns used in WHERE, JOIN, ORDER BY, UNIQUE. Composite index (school_id, created_at) helps queries that filter school then sort by date. Leftmost prefix rule: (a,b) helps a and a+b, not b alone. Too many indexes slow writes. Explain EXPLAIN in interviews if you have used it.",
  },
  {
    id: "e17",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "Migrations vs seeders vs factories.",
    a: "Migrations version the schema. Seeders insert demo/reference data. Factories generate fake model data for tests/seeds. Never seed production passwords in plaintext; use Hash::make. Run migrate on deploy; seed only when intended.",
  },
  {
    id: "e18",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Observers vs model events — write an Observer example.",
    a: "Observers keep models thin. creating/created/updating/updated/deleting. Don’t run heavy IO in observers without queues — they hide side effects.",
    code: `class UserObserver
{
    public function created(User $user): void
    {
        SendWelcomeEmail::dispatch($user);
    }

    public function deleting(User $user): void
    {
        $user->tokens()->delete();
    }
}

// AppServiceProvider::boot
User::observe(UserObserver::class);`,
  },

  // ─── Validation & Requests ────────────────────────────────
  {
    id: "v1",
    category: "Validation & Requests",
    level: "basic",
    kind: "conceptual",
    q: "Controller validate() vs Form Request — which and why?",
    a: "Form Requests (php artisan make:request StoreStudentRequest) keep controllers thin, reuse rules, and hold authorize(). Use them when rules grow or authorization is needed. $request->validated() returns only allowed fields — never request()->all() into create().",
  },
  {
    id: "v2",
    category: "Validation & Requests",
    level: "intermediate",
    kind: "coding",
    q: "Write StoreStudentRequest with unique email on create and ignore self on update.",
    a: "unique:table,column,except,idColumn. On update, ignore the current student id.",
    code: `public function authorize(): bool
{
    return $this->user()?->can('create', Student::class) ?? false;
}

public function rules(): array
{
    $id = $this->route('student')?->id;

    return [
        'name'  => ['required', 'string', 'max:255'],
        'email' => [
            'required',
            'email',
            Rule::unique('students', 'email')
                ->where(fn ($q) => $q->where('school_id', $this->user()->school_id))
                ->ignore($id),
        ],
        'grade' => ['nullable', 'string', 'max:50'],
    ];
}`,
  },
  {
    id: "v3",
    category: "Validation & Requests",
    level: "basic",
    kind: "conceptual",
    q: "Common validation rules you should know.",
    a: "required, nullable, string, integer, numeric, boolean, email, unique, exists, confirmed, min/max/between, in, array, date, file, mimes, image, regex, sometimes, required_if, current_password. exists:users,id prevents orphan FKs from request data.",
  },
  {
    id: "v4",
    category: "Validation & Requests",
    level: "advanced",
    kind: "coding",
    q: "Custom rule: password must not contain the user’s email local-part.",
    a: "Implement Illuminate\\Contracts\\Validation\\ValidationRule (Laravel 10+) or Rule object.",
    code: `class NotEmailLocalPart implements ValidationRule
{
    public function __construct(private string $email) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $local = strtolower(strtok($this->email, '@'));
        if ($local && str_contains(strtolower((string) $value), $local)) {
            $fail('Password must not contain your email name.');
        }
    }
}

'password' => ['required', 'min:8', new NotEmailLocalPart($this->email)],`,
  },
  {
    id: "v5",
    category: "Validation & Requests",
    level: "intermediate",
    kind: "conceptual",
    q: "What is $request->validated() vs all() vs only()?",
    a: "all() includes extra fields attackers add (is_admin=1). validated() is the safe list after rules pass. only(['name','email']) still can miss validation. Always persist validated().",
  },

  // ─── Auth & Security ──────────────────────────────────────
  {
    id: "a1",
    category: "Auth & Security",
    level: "basic",
    kind: "conceptual",
    q: "Hashing vs encryption. How does Laravel store passwords?",
    a: "Hashing is one-way (bcrypt/argon2 via Hash::make / 'hashed' cast). Encryption is two-way (Crypt::encryptString) for secrets you must read back. Never encrypt passwords — hash them. Hash::check($plain, $hashed) verifies. Don’t log passwords.",
  },
  {
    id: "a2",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "Session auth vs Sanctum vs JWT — when?",
    a: "Session + cookies: Blade/Livewire same-domain apps. Laravel Sanctum: SPA (cookie + CSRF) or simple API tokens for mobile. JWT (tymon/jwt-auth or custom): stateless APIs, microservices (like OEMS BFFs) where each service validates the token with a shared secret/public key. JWT is not a Laravel built-in; Sanctum tokens are stored hashed in personal_access_tokens.",
  },
  {
    id: "a3",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "Gates vs Policies.",
    a: "Gates: simple closures (Gate::define('view-admin', fn ($user) => $user->is_admin)). Policies: class per model (StudentPolicy@update). Use policies for CRUD on models, gates for one-off abilities. In controllers: $this->authorize('update', $student); Blade: @can('update', $student).",
  },
  {
    id: "a4",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "XSS, CSRF, SQL injection, mass assignment — Laravel defenses.",
    a: "XSS: Blade {{ }} escapes; {!! !!} is dangerous. CSRF: @csrf + middleware on web. SQLi: query bindings. Mass assignment: $fillable + validated(). Also: HTTPS, rate limiting, hashed passwords, APP_DEBUG=false in production, never expose .env, authorize() in form requests, hide ids with UUIDs if needed.",
  },
  {
    id: "a5",
    category: "Auth & Security",
    level: "basic",
    kind: "coding",
    q: "Write a Policy method: only same-school admin can update a student.",
    a: "Compare school_id and role.",
    code: `public function update(User $user, Student $student): bool
{
    return $user->school_id === $student->school_id
        && $user->hasRole('admin');
}`,
  },
  {
    id: "a6",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "What is in a JWT? How do you invalidate it?",
    a: "Header.payload.signature. Payload has sub (user id), exp, iss, role claims. Signature proves it wasn’t tampered. Stateless JWT cannot be revoked unless you keep a denylist (jti in Redis) or use short TTL + refresh tokens. That’s why many Laravel APIs use Sanctum tokens (revocable in DB) or a denylist for logout.",
  },
  {
    id: "a7",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "Why APP_DEBUG=true is dangerous in production?",
    a: "Stack traces leak env, SQL, paths, and class names. Combined with APP_KEY leak, encrypted data can be forged. Always APP_DEBUG=false, custom error pages, log exceptions to log/Sentry not to the browser.",
  },
  {
    id: "a8",
    category: "Auth & Security",
    level: "intermediate",
    kind: "coding",
    q: "Throttle login attempts.",
    a: "Use throttle middleware or RateLimiter.",
    code: `Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1'); // 5 per minute

RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});`,
  },

  // ─── APIs ─────────────────────────────────────────────────
  {
    id: "p1",
    category: "APIs",
    level: "basic",
    kind: "conceptual",
    q: "What is REST? What HTTP codes do you return?",
    a: "REST uses resources + HTTP verbs: GET (read), POST (create), PUT/PATCH (update), DELETE. Codes: 200 OK, 201 Created, 204 No Content, 400 validation, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 422 Unprocessable (Laravel validation), 429 rate limit, 500 server error. Don’t return 200 for failures.",
  },
  {
    id: "p2",
    category: "APIs",
    level: "intermediate",
    kind: "coding",
    q: "Write an API Resource for Student (hide internals, include school name).",
    a: "Resources shape JSON consistently and hide password, etc.",
    code: `class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'grade' => $this->grade,
            'school' => $this->whenLoaded('school', fn () => [
                'id' => $this->school->id,
                'name' => $this->school->name,
            ]),
        ];
    }
}

return StudentResource::collection($students);`,
  },
  {
    id: "p3",
    category: "APIs",
    level: "intermediate",
    kind: "conceptual",
    q: "How do you version APIs (/api/v1)?",
    a: "Prefix routes: Route::prefix('v1')->group(...). Separate controllers or namespaces. Don’t break existing clients. Header versioning (Accept: application/vnd.myapp.v2+json) is more advanced. For 1 year exp, URL prefix is the expected answer.",
  },
  {
    id: "p4",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "Idempotency — why does it matter for POST payments?",
    a: "Retrying POST can double-charge. Clients send Idempotency-Key; you store key→response in Redis/DB and return the same result. PUT/DELETE are naturally idempotent; POST is not. In exam/registration systems, the same apply for ‘start exam’ or ‘submit payment’.",
  },
  {
    id: "p5",
    category: "APIs",
    level: "basic",
    kind: "coding",
    q: "Return paginated JSON the Laravel way.",
    a: "paginate() includes links and meta. Use Resource::collection.",
    code: `$students = Student::query()
    ->where('school_id', auth()->user()->school_id)
    ->paginate(20);

return StudentResource::collection($students);`,
  },
  {
    id: "p6",
    category: "APIs",
    level: "intermediate",
    kind: "conceptual",
    q: "CORS — what is it and where is it configured?",
    a: "Browsers block JS on origin A from reading responses of origin B unless the server sends Access-Control-Allow-Origin. Laravel: config/cors.php, HandleCors middleware. Credentials need explicit origin, not *. APIs called from a separate frontend (Next.js) must allow that origin.",
  },
  {
    id: "p7",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "BFF pattern — what did you build in OEMS-style systems?",
    a: "BFF (Backend for Frontend) is an API layer per client (admin/student/superadmin). The browser talks to one BFF; the BFF calls downstream microservices (identity, school, exam) with JWT. Benefit: hide internal services, aggregate responses, apply portal-specific auth. Mention DownstreamClient, JWT forwarding, and not exposing internal ports publicly.",
  },

  // ─── Queues, Events & Jobs ────────────────────────────────
  {
    id: "q1",
    category: "Queues, Events & Jobs",
    level: "basic",
    kind: "conceptual",
    q: "Why queues? Sync vs database vs Redis driver.",
    a: "Queues move slow work (emails, reports, webhooks) off the HTTP request. sync runs immediately (local). database stores jobs in jobs table (simple, slower). redis is the usual production choice. Need a worker: php artisan queue:work. Supervisor keeps workers alive.",
  },
  {
    id: "q2",
    category: "Queues, Events & Jobs",
    level: "intermediate",
    kind: "coding",
    q: "Dispatch a job to send exam result email after submit.",
    a: "Implement ShouldQueue. Handle failures with $tries, $backoff, failed().",
    code: `class SendExamResultMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public array $backoff = [10, 60, 300];

    public function __construct(public ExamAttempt $attempt) {}

    public function handle(): void
    {
        Mail::to($this->attempt->student->email)
            ->send(new ExamResultMail($this->attempt));
    }
}

SendExamResultMail::dispatch($attempt);`,
  },
  {
    id: "q3",
    category: "Queues, Events & Jobs",
    level: "intermediate",
    kind: "conceptual",
    q: "Events vs Jobs vs Listeners vs Notifications.",
    a: "Event = something happened (ExamSubmitted). Listeners react (update stats, send mail). Jobs = unit of queued work. Notifications = user-facing channel (mail, database, SMS). Pattern: controller dispatches event; listeners dispatch jobs. Don’t put 200 lines in the controller after submit.",
  },
  {
    id: "q4",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "conceptual",
    q: "Failed jobs, retries, timeout, unique jobs.",
    a: "failed_jobs table + queue:retry. $timeout kills long jobs. $tries / retryUntil. ShouldBeUnique prevents duplicate ‘generate report’ jobs (needs cache driver). Always make jobs idempotent — workers can retry. Don’t pass huge Eloquent graphs; pass ids and re-fetch.",
  },
  {
    id: "q5",
    category: "Queues, Events & Jobs",
    level: "basic",
    kind: "conceptual",
    q: "Task scheduling: how does Kernel.php / routes/console.php schedule work?",
    a: "You define ->daily() / ->everyFiveMinutes() in the scheduler, but cron must hit php artisan schedule:run every minute. Without the cron, nothing runs. Common for report emails, cleaning expired OTPs, closing exams.",
    code: `Schedule::command('exams:close-expired')->everyMinute();
Schedule::job(new PurgeOtps)->dailyAt('02:00');`,
  },

  // ─── Caching & Performance ────────────────────────────────
  {
    id: "k1",
    category: "Caching & Performance",
    level: "basic",
    kind: "conceptual",
    q: "config:cache, route:cache, view:cache — production only?",
    a: "Yes for most teams. They speed boot. Locally they cause ‘my new route doesn’t exist’ bugs. After deploy: config:cache, route:cache, view:cache, then restart queue workers so they pick new code (queue:restart).",
  },
  {
    id: "k2",
    category: "Caching & Performance",
    level: "intermediate",
    kind: "coding",
    q: "Cache a school’s exam list for 10 minutes. Invalidate on update.",
    a: "Cache::remember + forget on write. Use a key that includes school id.",
    code: `$exams = Cache::remember("school:{$schoolId}:exams", 600, function () use ($schoolId) {
    return Exam::where('school_id', $schoolId)->get();
});

Cache::forget("school:{$schoolId}:exams");`,
  },
  {
    id: "k3",
    category: "Caching & Performance",
    level: "advanced",
    kind: "conceptual",
    q: "Cache stampede / atomic locks. Redis vs file cache.",
    a: "File cache is per-server (bad with multiple app nodes). Redis is shared. Stampede: many requests miss cache together and hit DB — use lock() or remember with a single filler. Cache::lock('sync-exam', 10)->get(fn () => ...). Don’t cache user-specific PII in public keys.",
  },
  {
    id: "k4",
    category: "Caching & Performance",
    level: "intermediate",
    kind: "conceptual",
    q: "How do you find a slow page in Laravel?",
    a: "Debugbar / Telescope locally. Log DB::listen. Check N+1, missing indexes, loading unused columns (select()), huge collections vs paginate, sync mail in request, debug images. Production: slow query log, APM (New Relic/Sentry performance), EXPLAIN.",
  },
  {
    id: "k5",
    category: "Caching & Performance",
    level: "advanced",
    kind: "conceptual",
    q: "select() and avoiding SELECT *.",
    a: "User::select('id','name')->get() reduces memory and payload. But then $user->email is null and you can accidentally save empty fields — be careful with updating partial models. For APIs, resources + select is a good combo.",
  },

  // ─── Architecture ─────────────────────────────────────────
  {
    id: "h1",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "Fat controllers vs Services vs Actions — what do you prefer?",
    a: "Controllers should: authorize, validate, call a service, return response. Business logic (create exam + questions + notify) goes to a Service or single-purpose Action class. Repositories are optional; don’t add them if they only wrap Eloquent 1:1. Interviewers like: ‘I extract when the controller exceeds simple CRUD’.",
  },
  {
    id: "h2",
    category: "Architecture",
    level: "advanced",
    kind: "conceptual",
    q: "Repository pattern — is it always needed in Laravel?",
    a: "Not always. Eloquent already is an Active Record. Repositories help if you must swap persistence or you have complex queries reused in many places. Fake benefit: ‘testability’ — you can mock services without a repository. Don’t copy Java enterprise layering blindly in a 1-year Laravel role.",
  },
  {
    id: "h3",
    category: "Architecture",
    level: "advanced",
    kind: "conceptual",
    q: "How would you split a monolith into Laravel microservices?",
    a: "Split by domain (identity, school, exam, notification), each with its own DB. Communicate via HTTP/JWT or queues. Shared contracts (OpenAPI). Challenges: transactions across services, auth, latency, ops (Docker, Consul). OEMS-style: BFF aggregates; services don’t share tables. Don’t split too early — modular monolith is often enough.",
  },
  {
    id: "h4",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "Dependency inversion in Laravel — interface + bind.",
    a: "High-level OrderService depends on PaymentGateway interface, not Stripe class. Bind in a provider. Tests bind a FakeGateway. This is SOLID’s D. Real example: SMS provider swap (Twilio vs MSG91).",
    code: `interface SmsSender {
    public function send(string $to, string $message): void;
}

$this->app->bind(SmsSender::class, Msg91Sender::class);`,
  },
  {
    id: "h5",
    category: "Architecture",
    level: "basic",
    kind: "conceptual",
    q: "MVC in Laravel — where does each piece live?",
    a: "Model: app/Models (data + relations). View: Blade/resources or JSON resources. Controller: HTTP layer. Extra: requests, policies, jobs, mail, events. config/ for configuration. database/migrations. routes/. Don’t put SQL in Blade or HTML in models.",
  },
  {
    id: "h6",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "Feature tests vs unit tests. What would you test for login?",
    a: "Feature tests hit HTTP: post('/login') and assert redirect/json + auth. Unit tests hit a single class with mocks. For 1 year: write feature tests for auth, validation 422, and one happy-path CRUD. php artisan test / pest. RefreshDatabase trait.",
    code: `public function test_admin_can_login(): void
{
    $user = User::factory()->create(['password' => 'secret123']);

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'secret123',
    ])->assertRedirect('/dashboard');

    $this->assertAuthenticatedAs($user);
}`,
  },

  // ─── Coding Problems ──────────────────────────────────────
  {
    id: "d1",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "CRUD: store a Post from a validated request (safe mass assignment).",
    a: "Use Form Request + create(validated).",
    code: `public function store(StorePostRequest $request)
{
    $post = Post::create($request->validated() + [
        'user_id' => $request->user()->id,
    ]);

    return redirect()->route('posts.show', $post);
}`,
  },
  {
    id: "d2",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Fix this N+1 and add search + pagination.",
    a: "Eager load, where like on indexed-enough columns, paginate.",
    code: `public function index(Request $request)
{
    $q = $request->string('search');

    $students = Student::query()
        ->with('school:id,name')
        ->when($q->isNotEmpty(), function ($query) use ($q) {
            $query->where(function ($inner) use ($q) {
                $inner->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('admission_number', 'like', "%{$q}%");
            });
        })
        ->latest()
        ->paginate(20)
        ->withQueryString();

    return view('admin.students.index', compact('students'));
}`,
  },
  {
    id: "d3",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Upload a student photo to storage and save the path.",
    a: "Validate mime/size. store() on the public disk. Never trust client filenames blindly.",
    code: `public function updatePhoto(Request $request, Student $student)
{
    $request->validate([
        'photo' => ['required', 'image', 'max:2048'],
    ]);

    $path = $request->file('photo')->store('students', 'public');
    $student->update(['photo' => $path]);

    return back();
}

// asset: Storage::url($student->photo)  // /storage/students/...`,
  },
  {
    id: "d4",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Bulk assign grade to selected student ids, scoped to the admin’s school.",
    a: "Validate ids exist in that school. Update in one query. Don’t trust client-sent school_id.",
    code: `public function batchUpdate(Request $request)
{
    $data = $request->validate([
        'grade' => ['required', 'string', 'max:50'],
        'student_ids' => ['required', 'array', 'min:1'],
        'student_ids.*' => ['integer'],
    ]);

    $count = Student::query()
        ->where('school_id', $request->user()->school_id)
        ->whereIn('id', $data['student_ids'])
        ->update(['grade' => $data['grade']]);

    return back()->with('success', "Updated {$count} students.");
}`,
  },
  {
    id: "d5",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Write an Eloquent query: last 7 days’ exam attempts per student with attempt count.",
    a: "withCount + where on relation date.",
    code: `Student::query()
    ->withCount(['attempts as week_attempts' => function ($q) {
        $q->where('created_at', '>=', now()->subDays(7));
    }])
    ->having('week_attempts', '>', 0)
    ->orderByDesc('week_attempts')
    ->get();`,
  },
  {
    id: "d6",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Prevent double exam submit with a lock (race condition).",
    a: "Use unique constraint + catch duplicate, or lockForUpdate inside a transaction.",
    code: `DB::transaction(function () use ($examId, $studentId, $answers) {
    $attempt = ExamAttempt::where('exam_id', $examId)
        ->where('student_id', $studentId)
        ->lockForUpdate()
        ->firstOrFail();

    if ($attempt->submitted_at) {
        abort(409, 'Already submitted');
    }

    $attempt->update([
        'answers' => $answers,
        'submitted_at' => now(),
    ]);
});

// Also unique(exam_id, student_id) in migration`,
  },
  {
    id: "d7",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "Blade: show a list and a CSRF form. Escape output.",
    a: "{{ }} escapes. @csrf on POST forms. @forelse for empty state.",
    code: `@forelse ($students as $student)
    <li>{{ $student->name }}</li>
@empty
    <li>No students</li>
@endforelse

<form method="POST" action="{{ route('admin.students.store') }}">
    @csrf
    <input name="name" value="{{ old('name') }}">
    @error('name') <span>{{ $message }}</span> @enderror
    <button>Save</button>
</form>`,
  },
  {
    id: "d8",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "API login with Sanctum token.",
    a: "Validate credentials, Hash check or Auth::attempt, then createToken.",
    code: `public function login(Request $request)
{
    $data = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    $user = User::where('email', $data['email'])->first();

    if (!$user || !Hash::check($data['password'], $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Invalid credentials.'],
        ]);
    }

    $token = $user->createToken('api')->plainTextToken;

    return response()->json(['token' => $token, 'user' => $user]);
}`,
  },
  {
    id: "d9",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Write a console command to close exams whose end_at has passed.",
    a: "make:command, handle(), schedule it.",
    code: `class CloseExpiredExams extends Command
{
    protected $signature = 'exams:close-expired';
    protected $description = 'Mark expired exams as closed';

    public function handle(): int
    {
        $n = Exam::query()
            ->where('status', 'live')
            ->where('end_at', '<', now())
            ->update(['status' => 'closed']);

        $this->info("Closed {$n} exams.");
        return self::SUCCESS;
    }
}`,
  },
  {
    id: "d10",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Many-to-many attach/sync/detach — assign roles without wiping extra pivots accidentally.",
    a: "attach adds, detach removes, sync replaces the whole set, syncWithoutDetaching adds missing. Prefer sync($ids) when the form sends the full role list.",
    code: `$user->roles()->sync([1, 2, 3]);
$user->roles()->attach(4, ['assigned_by' => auth()->id()]);
$user->roles()->detach(4);`,
  },
  {
    id: "d11",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "Tinker one-liners you should know.",
    a: "Quick debugging without writing a controller.",
    code: `php artisan tinker
User::count();
User::find(1)->toArray();
Hash::make('secret');
Student::where('school_id', 1)->pluck('email');
Cache::flush();`,
  },
  {
    id: "d12",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "HTTP client: call a downstream service with JWT and timeout.",
    a: "Use Http::timeout + throw + retry. Don’t ignore 5xx silently in a BFF.",
    code: `$response = Http::timeout(5)
    ->retry(2, 100)
    ->withToken($jwt)
    ->acceptJson()
    ->get(config('services.school.url').'/api/staff-requests');

$response->throw();
$data = $response->json();`,
  },
  {
    id: "d13",
    category: "Coding Problems",
    level: "intermediate",
    kind: "conceptual",
    q: "Livewire vs Blade vs API+Next — when for a Laravel backend person?",
    a: "Blade/Livewire: admin panels fast, same repo. API + separate frontend: mobile/SPA, multiple clients. You as backend still own validation, policies, DB, queues. Don’t say you ‘only write JSON’ if you ship Blade at work — both count.",
  },
  {
    id: "d14",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "What happens if you forget @csrf on a Blade POST form?",
    a: "419 Page Expired. VerifyCsrfToken rejects the request. For AJAX, send X-CSRF-TOKEN from <meta name='csrf-token'>. Login/logout must be POST/DELETE with CSRF, not GET.",
  },
  {
    id: "d15",
    category: "Coding Problems",
    level: "advanced",
    kind: "conceptual",
    q: "How do you handle file storage on multiple servers?",
    a: "Local disk is not shared across app nodes. Use S3/MinIO (FILESYSTEM_DISK=s3) or NFS. Store only the path in DB. Queue workers must use the same disk. Never git-commit uploaded files.",
  },
  {
    id: "d16",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Collection vs query: don’t load the whole table to filter in PHP.",
    a: "Filter in SQL. Collections are for in-memory lists already loaded.",
    code: `// Bad
User::all()->where('active', true);

// Good
User::where('active', true)->get();

// OK once loaded
$active = $users->where('active', true)->values();`,
  },
  {
    id: "d17",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "Named routes vs hardcoded /admin/students urls.",
    a: "route('admin.students.index') survives URL changes. old(), redirect()->route(), Blade all use names. Always name routes in groups with ->name('admin.').",
  },
  {
    id: "d18",
    category: "Coding Problems",
    level: "advanced",
    kind: "conceptual",
    q: "Zero-downtime migrate: adding a column used by new code.",
    a: "Expand/contract: 1) deploy migration that adds nullable column. 2) deploy code that writes the column. 3) backfill. 4) make NOT NULL if needed. Dropping columns / renaming is dangerous while old workers still run. queue:restart after deploy. Avoid migrate:refresh on production.",
  },
  {
    id: "d19",
    category: "Coding Problems",
    level: "intermediate",
    kind: "conceptual",
    q: "What is eager loading constraint vs lazy eager load?",
    a: "with(['comments' => fn ($q) => $q->where('approved', true)]). load('comments') on an already-fetched collection is lazy eager loading (still 1 extra query, not N). Useful after you decide you need the relation.",
  },
  {
    id: "d20",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "Difference between PUT, PATCH, and POST in Laravel controllers.",
    a: "POST create. PUT replace full resource (or Laravel method spoofing _method=PUT from forms). PATCH partial update. HTML forms only GET/POST so we @method('PUT'). APIs can send real verbs.",
  },
];
